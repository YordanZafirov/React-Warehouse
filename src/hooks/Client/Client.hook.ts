import { Client } from "../../pages/Client/ListClients/Client.static";
import { useQuery } from "react-query";
import { endpoint } from "../../static/endpoints/Endpoint";

const useGetClient = () => {
  const {
    data: clients,
    isLoading,
    error,
    refetch,
  } = useQuery("clients", getClient);

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

  return {
    clients,
    isLoading,
    error,
    refetch,
  };
};

export default useGetClient;
