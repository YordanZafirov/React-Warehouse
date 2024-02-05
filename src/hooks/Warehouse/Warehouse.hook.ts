import { useQuery } from "react-query";
import { endpoint } from "../../static/endpoints/Endpoint";
import { Warehouse } from "../../pages/Warehouse/Warehouse.static";

const useGetWarehouse = () => {
  const {
    data: warehouses,
    isLoading,
    error,
    refetch,
  } = useQuery("warehouses", getWarehouse);

  async function getWarehouse() {
    try {
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

      return data.map((warehouse: Warehouse) => ({
        ...warehouse,
        createdAt: new Date(warehouse.createdAt),
        updatedAt: new Date(warehouse.updatedAt),
      }));
    } catch (error) {
      console.error(error);
    }
  }

  return {
    warehouses,
    isLoading,
    error,
    refetch,
  };
};

export default useGetWarehouse;
