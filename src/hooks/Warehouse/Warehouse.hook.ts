import { useState } from "react";
import { Warehouse } from "../../pages/Warehouse/Warehouse.static";
import { endpoint } from "../../static/endpoints/Endpoint";
import { token } from "../../static/token";

const useWarehouse = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  const getWarehouse = () => {
    fetch(endpoint.warehouse, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: Warehouse[]) => {
        setWarehouses(
          data.map((warehouse) => ({
            ...warehouse,
            createdAt: new Date(warehouse.createdAt).toLocaleString(),
            updatedAt: new Date(warehouse.updatedAt).toLocaleString(),
          }))
        );
        return data;
      })
      .catch((error) => {
        console.error("Error fetching warehouse:", error);
      });
  };

  const deleteWarehouse = (id: string) => {
    fetch(`${endpoint.warehouse}/soft-delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to delete warehouse. Status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setWarehouses((prevWarehouses) =>
          prevWarehouses.filter((warehouse) => warehouse.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting warehouse:", error);
      });
  };

  return { warehouses, getWarehouse, deleteWarehouse };
};

export default useWarehouse;
