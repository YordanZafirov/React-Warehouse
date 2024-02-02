import { Client } from "../../pages/Client/Client.static";
import { useMutation, useQuery } from "react-query";

const useClient = () => {
  const {
    data: clients,
    isLoading,
    error,
    refetch,
  } = useQuery("clients", getClient);

  const deleteWarehouseMutation = useMutation(deleteClient);

  async function getClient() {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Access token not found");
    }
    const res = await fetch("http://localhost:3000/client/", {
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

    if (!Array.isArray(data)) {
      throw new Error(`Unexpected data format: ${JSON.stringify(data)}`);
    }

    return data.map((client: Client) => ({
      ...client,
      createdAt: new Date(client.createdAt),
      updatedAt: new Date(client.updatedAt),
    }));
  }
  async function deleteClient(id: string) {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Access token not found");
    }

    const res = await fetch(`http://localhost:3000/client/soft-delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to delete client: ${res.statusText}`);
    }
    refetch();
  }

  return {
    clients,
    isLoading,
    error,
    deleteClient: deleteWarehouseMutation.mutate,
  };
};

export default useClient;
