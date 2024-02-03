import { Order } from "./Order.static";
import { endpoint } from "../../static/endpoints/Endpoint";
import { useMutation, useQuery } from "react-query";

const useOrder = () => {
  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useQuery("orders", getOrder);
  const deleteOrderMutation = useMutation(deleteOrder);

  async function getOrder() {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }
      const res = await fetch(endpoint.order, {
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

      return data.map((order: Order) => ({
        ...order,
        createdAt: new Date(order.createdAt).toLocaleString(),
      }));
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteOrder(id: string) {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }

      const res = await fetch(`${endpoint.order}/soft-delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete order: ${res.statusText}`);
      }
      refetch();
    } catch (error) {
      console.error(error);
    }
  }

  return { orders, isLoading, error, deleteOrder: deleteOrderMutation.mutate };
};

export default useOrder;
