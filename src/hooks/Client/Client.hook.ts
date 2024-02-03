import { Client } from "../../pages/Client/Client.static";
import { useMutation, useQuery } from "react-query";
import { endpoint } from "../../static/endpoints/Endpoint";

const useClient = () => {
  const {
    data: clients,
    isLoading,
    error,
    refetch,
  } = useQuery("clients", getClient);

  const deleteWarehouseMutation = useMutation(deleteClient);

  async function getClient() {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }
      const res = await fetch(endpoint.client, {
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

      return data.map((client: Client) => ({
        ...client,
        createdAt: new Date(client.createdAt),
        updatedAt: new Date(client.updatedAt),
      }));
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteClient(id: string) {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }

      const res = await fetch(
        `http://localhost:3000/client/soft-delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to delete client: ${res.statusText}`);
      }
      refetch();
    } catch (error) {
      console.error(error);
    }
  }

  return {
    clients,
    isLoading,
    error,
    deleteClient: deleteWarehouseMutation.mutate,
  };
};

export default useClient;
