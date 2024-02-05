import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { endpoint } from "../../../static/endpoints/Endpoint";

const useUpdateWarehouse = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    success: false,
    errMsg: "",
  });

  const {
    data: warehouse,
    isLoading,
    error,
    refetch,
  } = useQuery(["warehouse", id], () => (id ? getWarehouseId(id) : null), {
    enabled: !!id, // Only enable the query if id is truthy
  });

  const updateWarehouseMutation = useMutation(
    (updatedWarehouse: {}) =>
      id ? updateWarehouse(id, updatedWarehouse) : Promise.resolve(null),
    {
      onSuccess: () => {
        if (id) {
          queryClient.invalidateQueries(["warehouse", id]);
        }
      },
    }
  );

  const getWarehouseId = async (id: string) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }
      const res = await fetch(endpoint.warehouse + "/" + id, {
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
      throw error;
    }
  };

  const updateWarehouse = async (id: string, updatedWarehouse: {}) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }

      const res = await fetch(endpoint.warehouse + "/" + id, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedWarehouse),
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
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

        navigate("/warehouse");
      }, 3000);

      return data;
    } catch (error) {
      setAlert({ success: false, errMsg: "Error updating warehouse" });
      console.error(error);
      throw error;
    }
  };
  return {
    warehouse,
    isLoading,
    error,
    refetch,
    updateWarehouse: updateWarehouseMutation.mutate,
    alert,
    setAlert
  };
};

export default useUpdateWarehouse;
