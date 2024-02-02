import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import {
  ClearButton,
  ModalButton,
  ModalButtonDiv,
  ModalForm,
  NoItemsParagraph,
  RemoveButton,
} from "./Cart.style";
import { endpoint } from "../../static/endpoints/Endpoint";
import { Client } from "../Client/Client.static";



interface Warehouse {
  id: string;
  name: string;
  type: "solid" | "liquid";
}

interface Product {
  id: string;
  type: "solid" | "liquid";
  unitType: "kg" | "L";
  quantity?: number;
  unitPrice?: number;
  name: string;
}

interface Order {
  type: string;
  clientId: string;
  warehouseId: string;
  outgoingWarehouse: string;
  product: Product[];
  errMsg: string;
  success: boolean;
}

const Cart: React.FC = () => {
  const { items, clearCart, removeItem } = useCart();
  const [order, setOrder] = useState<Order>({
    type: "",
    clientId: "",
    warehouseId: "",
    outgoingWarehouse: "",
    product: [],
    errMsg: "",
    success: false,
  });

  const [clients, setClients] = useState<Client[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const token = localStorage.getItem("accessToken");

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
      .then((data) => setWarehouses(data));
  };

  const fetchProducts = async () => {
    const productDetailsPromises = items.map(async (item) => {
      const res = await fetch(endpoint.product + "/" + item.id, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const productDetails: Product = {
        id: item.id,
        type: data.type,
        unitType: data.unitType,
        name: data.name,
        quantity: 1,
        unitPrice: 0,
      };
      return productDetails;
    });

    const productDetails = await Promise.all(productDetailsPromises);
    setProducts(productDetails);
  };

  useEffect(() => {
    fetchClients();
    fetchWarehouses();
    fetchProducts();
  }, [items]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleProductChange = (
    productId: string,
    field: string,
    value: string
  ) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            [field]:
              field === "quantity" || field === "unitPrice"
                ? parseFloat(value)
                : value,
          };
        }
        return product;
      });
      return updatedProducts;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { type, clientId, warehouseId, outgoingWarehouse } = order;
    const product = products.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      unitPrice: product.unitPrice,
    }));

    const requestBody = {
      type,
      clientId,
      warehouseId,
      product,
    };

    if (outgoingWarehouse) {
      Object.assign(requestBody, { outgoingWarehouse });
    }

    const body = JSON.stringify(requestBody);

    console.log(body);

    try {
      fetch("http://localhost:3000/order", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setOrder((prevOrder) => ({
              ...prevOrder,
              success: true,
            }));
          } else {
            setOrder((prevOrder) => ({
              ...prevOrder,
              errMsg: data.message,
            }));
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {items.length === 0 ? (
        <NoItemsParagraph>No items in the cart!</NoItemsParagraph>
      ) : (
        <ModalForm title="Cart" onSubmit={handleSubmit}>
          <label htmlFor="order-type">Order Type</label>
          <select
            name="type"
            id="order-type"
            required
            value={order.type}
            onChange={handleChange}
          >
            <option value="stock picking">Stock Picking</option>
            <option value="delivery">Delivery</option>
            <option value="transfer">Transfer</option>
          </select>
          <label htmlFor="client">Client</label>
          <select
            name="clientId"
            id="client"
            required
            value={order.clientId}
            onChange={handleChange}
          >
            {clients ? (
              clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.accountablePerson}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Loading clients...
              </option>
            )}
          </select>
          <label htmlFor="warehouse">Warehouse</label>
          <select
            name="warehouseId"
            id="warehouse"
            value={order.warehouseId}
            onChange={handleChange}
          >
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {`${warehouse.name}`}
              </option>
            ))}
          </select>

          <label htmlFor="outgoing-warehouse">Outgoing Warehouse</label>
          <select
            name="outgoingWarehouse"
            id="outgoing-warehouse"
            value={order.outgoingWarehouse}
            onChange={handleChange}
          >
            <option value="">Select Outgoing Warehouse</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>

          {products.length > 0 && ( // Check if there are products before rendering
            <>
              <h2>Product Information:</h2>
              <ul>
                {products.map((product) => (
                  <li key={product.id}>
                    <div className="product-item">
                      <span className="product-name">{`Product Name: ${product.name}`}</span>
                      <div className="input-group">
                        <label htmlFor={`unitPrice_${product.id}`}>
                          Unit Price:
                        </label>
                        <input
                          type="number"
                          id={`unitPrice_${product.id}`}
                          className="input-field"
                          name="unitPrice"
                          value={product.unitPrice || ""}
                          onChange={(e) =>
                            handleProductChange(
                              product.id,
                              "unitPrice",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="input-group">
                        <label htmlFor={`quantity_${product.id}`}>
                          Quantity:
                        </label>
                        <input
                          type="number"
                          id={`quantity_${product.id}`}
                          className="input-field"
                          name="quantity"
                          value={product.quantity || ""}
                          onChange={(e) =>
                            handleProductChange(
                              product.id,
                              "quantity",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <RemoveButton
                        type="button"
                        className="remove"
                        onClick={() => removeItem(product.id)}
                      >
                        X
                      </RemoveButton>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
          <ModalButtonDiv>
            <ModalButton>Submit</ModalButton>
            <ClearButton className="clear" onClick={clearCart}>
              Clear Cart
            </ClearButton>
          </ModalButtonDiv>
        </ModalForm>
      )}
    </>
  );
};
export default Cart;