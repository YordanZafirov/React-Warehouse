import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { endpoint } from "../../../static/endpoints/Endpoint";
import { useState } from "react";

const useUpdateClient = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const queryClient = useQueryClient();

  const [alert, setAlert] = useState({
    success: false,
    errMsg: "",
  });

  const navigate = useNavigate();

  const {
    data: client,
    isLoading,
    error,
    refetch,
  } = useQuery(["client", id], () => (id ? getClientId(id) : null), {
    enabled: !!id, // Only enable the query if id is truthy
  });

  const updateClientMutation = useMutation(
    (updatedClient: {}) =>
      id ? updateClient(id, updatedClient) : Promise.resolve(null),
    {
      onSuccess: () => {
        if (id) {
          queryClient.invalidateQueries(["client", id]);
        }
      },
    }
  );

  async function getClientId(id: string) {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }
      const res = await fetch(endpoint.client + "/" + id, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }

      const data = await res.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function updateClient(id: string, updatedClient: any) {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }

      const res = await fetch(endpoint.client + "/" + id, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedClient),
      });

      if (!res.ok) {
        setAlert(() => ({
          success: false,
          errMsg: "Failed to update client",
        }));
        throw new Error(`Failed to update data: ${res.statusText}`);
      }

      const data = await res.json();
      setAlert((prevState) => ({
        ...prevState,
        success: true,
      }));

      setTimeout(() => {
        setAlert((prevState) => ({
          ...prevState,
          success: false,
        }));

        navigate("/");
      }, 3000);

      return data;
    } catch (error) {
      setAlert((prevState) => ({
        ...prevState,
        errMsg: "Failed to update client",
      }));
      console.error(error);
    }
  }

  return {
    client,
    alert,
    setAlert,
    isLoading,
    error,
    refetch,
    updateClient: updateClientMutation.mutate,
  };
};

export default useUpdateClient;
