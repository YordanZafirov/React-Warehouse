import { Order } from "./Order.static";
import { endpoint } from "../../static/endpoints/Endpoint";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

const useOrder = () => {
  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useQuery("orders", getOrder);
  const deleteOrderMutation = useMutation(deleteOrder);
  const permanentDeleteOrderMutation = useMutation(permanentDeleteOrder);

  // The getOrder function is used to fetch all orders
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

  // The deleteOrder function is used to soft delete an order
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

      toast.success("Order deleted successfully");
      refetch();
    } catch (error) {
      console.error(error);
    }
  }

  // The permanentDeleteOrder function is used to permanently delete an order
  async function permanentDeleteOrder(id: string) {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }

      const res = await fetch(`${endpoint.order}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete order: ${res.statusText}`);
      }

      toast.success("Order permanent deleted successfully");
      refetch();
    } catch (error) {
      toast.error(
        "Failed to delete order. Order is associated with an invoice"
      );
      console.error(error);
    }
  }

  return {
    orders,
    isLoading,
    error,
    deleteOrder: deleteOrderMutation.mutate,
    permanentDeleteOrder: permanentDeleteOrderMutation.mutate,
  };
};

export default useOrder;
