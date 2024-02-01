import { useState } from "react";
import { Order } from "./Order.static";
import { endpoint } from "../../static/endpoints/Endpoint";
import { token } from "../../static/token";

const useOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = () => {
    fetch(endpoint.order, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: Order[]) => {
        setOrders(
          data.map((order) => ({
            ...order,
            createdAt: new Date(order.createdAt).toLocaleString(),
          }))
        );
      });
  };

  const handleDelete = (id: string) => {
    fetch(endpoint.order + "/soft-delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to delete order. Status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setOrders((prevOrder) =>
        prevOrder.filter((order) => order.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };

  return { orders, fetchOrders, handleDelete };
};

export default useOrder;
