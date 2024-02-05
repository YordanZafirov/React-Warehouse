import { useMutation } from "react-query";
import { endpoint } from "../../../static/endpoints/Endpoint";
import useWarehouse from "../../../hooks/Warehouse/Warehouse.hook";
import { toast } from "react-toastify";

const useDeleteWarehouse = () => {
  const { refetch } = useWarehouse();

  const deleteWarehouseMutation = useMutation(deleteWarehouse);

  async function deleteWarehouse(id: string) {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }

      const res = await fetch(`${endpoint.warehouse}/soft-delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete warehouse: ${res.statusText}`);
      }

      toast.success("Warehouse deleted successfully");
      refetch();
    } catch (error) {
      console.error(error);
    }
  }
  return {
    deleteWarehouse: deleteWarehouseMutation.mutate,
  };
};

export default useDeleteWarehouse;
