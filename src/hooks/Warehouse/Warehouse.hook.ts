import { useMutation, useQuery } from "react-query";
import { endpoint } from "../../static/endpoints/Endpoint";
import { Warehouse } from "../../pages/Warehouse/Warehouse.static";

const useWarehouse = () => {
  const {
    data: warehouses,
    isLoading,
    error,
    refetch,
  } = useQuery("warehouses", getWarehouse);

  const deleteWarehouseMutation = useMutation(deleteWarehouse);

  async function getWarehouse() {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Access token not found");
    }
    const res = await fetch(endpoint.warehouse, {
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

    return data.map((warehouse: Warehouse) => ({
      ...warehouse,
      createdAt: new Date(warehouse.createdAt),
      updatedAt: new Date(warehouse.updatedAt),
    }));
  }

  async function deleteWarehouse(id: string) {
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

    refetch();
  }

  return {
    warehouses,
    isLoading,
    error,
    deleteWarehouse: deleteWarehouseMutation.mutate,
  };
};

export default useWarehouse;
