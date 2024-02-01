import { useEffect, useState } from "react";

import { Warehouse } from "../Order/ListOrder";
import { endpoint } from "../../static/endpoints/Endpoint";

export interface Client {
  createdAt: string;
  id: string;
  orderId: Order;
  productId: Product;
  quantity: number;
  unitPrice: number;
  updatedAt: Date;
}

export interface Order {
  id: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface Product {
  id: string;
  name: string;
  unitType: string;
  type: string;
  createdAt: Date;
}

const Invoice = () => {
  const [orderDetails, setOrderDetails] = useState<Order[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const token = localStorage.getItem("accessToken");

  const fetchOrdersDetails = () => {
    fetch(endpoint.orderDetail, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: Order[]) => {
        // setOrderDetails(
        //   data.map((order) => ({
        //     ...order,
        //     createdAt: new Date(order.createdAt).toLocaleString(),
        //   }))
        // );
      });
  };

  const fetchClients = () => {
    fetch(endpoint.client, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClients(data);
      });
  };

  const fetchWarehouses = () => {
    fetch(endpoint.warehouse, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setWarehouses(data);
      });
  };

  const fetchProducts = () => {
    fetch(endpoint.product, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  useEffect(() => {
    fetchOrdersDetails();
    fetchClients();
    fetchWarehouses();
    fetchProducts();
    console.log("OrderDetails: ", orderDetails);
    console.log("Clients: ", clients);
    console.log("Warehouses: ", warehouses);
    console.log("Products: ", products);
  }, []);

  const getClientName = (clientId: string) => {
    const client = clients.find((client) => client.id === clientId);
    console.log(client);
    return client ? client.accountablePerson : "Unknown Client";
  };

  const getWarehouseName = (warehouseId: string) => {
    const warehouse = warehouses.find(
      (warehouse) => warehouse.id === warehouseId
    );
    return warehouse ? warehouse.name : "Unknown Warehouse";
  };

  const getProductName = (productId: string) => {
    const product = products.find((product) => product.id === productId);
    return product ? product.name : "Unknown Product";
  };

  return <div></div>;
};

export default Invoice;
