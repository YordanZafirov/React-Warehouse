import { useMutation } from "react-query";
import useClient from "../../../hooks/Client/Client.hook";
import { toast } from "react-toastify";

const useDeleteClient = () => {
  const { refetch } = useClient();

  const deleteWarehouseMutation = useMutation(deleteClient);

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

      toast.success("Client deleted successfully");
      refetch();
    } catch (error) {
      console.error(error);
    }
  }

  return {
    deleteClient: deleteWarehouseMutation.mutate,
  };
};

export default useDeleteClient;
