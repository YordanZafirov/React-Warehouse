import { useMutation } from "react-query";
import useClient from "../../../hooks/Client/Client.hook";
import { toast } from "react-toastify";
import { endpoint } from "../../../static/endpoints/Endpoint";

const useDeleteClient = () => {
  const { refetch } = useClient();

  const deleteWarehouseMutation = useMutation(deleteClient);
  const permanentDeleteClientMutation = useMutation(permanentDeleteClient);

  async function deleteClient(id: string) {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }

      const res = await fetch(`${endpoint.client}/soft-delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete client: ${res.statusText}`);
      }

      toast.success("Client deleted successfully");
      refetch();
    } catch (error) {
      console.error(error);
    }
  }

  async function permanentDeleteClient(id: string) {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }

      const res = await fetch(`${endpoint.client}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete client: ${res.statusText}`);
      }

      toast.success("Client permanent deleted successfully");
      refetch();
    } catch (error) {
      toast.error(
        "Failed to delete client. Client is associated with an order"
      );
      console.error(error);
    }
  }

  return {
    deleteClient: deleteWarehouseMutation.mutate,
    permanentDeleteClient: permanentDeleteClientMutation.mutate,
  };
};

export default useDeleteClient;
