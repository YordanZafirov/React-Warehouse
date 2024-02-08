import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import {
  ClearButton,
  FormRow,
  InputGroup,
  ModalButton,
  ModalButtonDiv,
  ModalForm,
  NoItemsParagraph,
  ProductItem,
  ProductSection,
  RemoveButton,
} from "./Cart.style";
import { endpoint } from "../../static/endpoints/Endpoint";
import { Client } from "../Client/ListClients/Client.static";
import useGetClient from "../../hooks/Client/Client.hook";
import useGetWarehouse from "../../hooks/Warehouse/Warehouse.hook";
import { Warehouse } from "../Warehouse/WarehouseForm/Warehouse.static";
import { toast } from "react-toastify";

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

const Cart: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const { items, clearCart, removeItem } = useCart();
  const { clients } = useGetClient();
  const { warehouses } = useGetWarehouse();

  const [order, setOrder] = useState<Order>({
    type: "",
    clientId: "",
    warehouseId: "",
    outgoingWarehouse: "",
    product: [],
    errMsg: "",
    success: false,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredWarehouses, setFilteredWarehouses] = useState<
    Warehouse[] | undefined
  >(undefined);

  const token = localStorage.getItem("accessToken");

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

  useEffect(() => {
    fetchProducts();
  }, [items]);

  useEffect(() => {
    if (clients && clients.length > 0 && warehouses && warehouses.length > 0) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        type: prevOrder.type || "stock picking",
        clientId: prevOrder.clientId || clients[0]?.id || "",
        warehouseId: prevOrder.warehouseId || warehouses[0]?.id || "",
        outgoingWarehouse: prevOrder.outgoingWarehouse || "",
      }));
    }
  }, [clients, warehouses]);

  useEffect(() => {
    if (products.length > 0) {
      const filteredWarehouses = warehouses?.filter(
        (warehouse: Warehouse) => warehouse.type === products[0]?.type
      );
      setFilteredWarehouses(filteredWarehouses);
    }
  }, [products, warehouses]);

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

    try {
      fetch(endpoint.order, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error creating order");
          }
          return res.json();
        })
        .then((data) => {
          if (data) {
            toast.success("Order created successfully");
            clearCart();
            setTimeout(() => {
              onSubmit();
            }, 2000);
          } else {
            toast.error("Error creating order");
          }
        });
    } catch (error) {
      console.error(error);
      toast.error("Error creating order");
    }
  };

  return (
    <>
      {items.length === 0 ? (
        <NoItemsParagraph>No items in the cart!</NoItemsParagraph>
      ) : (
        <ModalForm title="Cart" onSubmit={handleSubmit}>
          <FormRow>
            <label className="select-label" htmlFor="order-type">Order Type:</label>
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
          </FormRow>
          <FormRow>
            <label className="select-label" htmlFor="client">Client:</label>
            <select
              name="clientId"
              id="client"
              required
              value={order.clientId}
              onChange={handleChange}
            >
              {clients ? (
                clients.map((client: Client) => (
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
          </FormRow>
          <FormRow>
            <label className="select-label" htmlFor="warehouse">Warehouse:</label>
            <select
              name="warehouseId"
              id="warehouse"
              value={order.warehouseId}
              onChange={handleChange}
            >
              {filteredWarehouses?.map((warehouse: Warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
            </select>
          </FormRow>

          <FormRow>
            <label htmlFor="outgoing-warehouse">Outgoing Warehouse:</label>
            <select
              name="outgoingWarehouse"
              id="outgoing-warehouse"
              value={order.outgoingWarehouse}
              onChange={handleChange}
            >
              <option value="">Select Outgoing Warehouse</option>
              {filteredWarehouses?.map((warehouse: Warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
            </select>
          </FormRow>

          {products.length > 0 && ( // Check if there are products before rendering
            <ProductSection>
              <h2>Product Information:</h2>
              <ul>
                {products.map((product) => (
                  <li key={product.id}>
                    <ProductItem>
                      <div className="product-name">{`Product Name: ${product.name}`}</div>
                      <InputGroup>
                        <label className="input-label" htmlFor={`unitPrice_${product.id}`}>
                          Unit Price:
                        </label>
                        <input
                          type="number"
                          id={`unitPrice_${product.id}`}
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
                      </InputGroup>
                      <InputGroup>
                        <label htmlFor={`quantity_${product.id}`}>
                          Quantity:
                        </label>
                        <input
                          type="number"
                          id={`quantity_${product.id}`}
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
                      </InputGroup>
                      <RemoveButton
                        type="button"
                        className="remove"
                        onClick={() => removeItem(product.id)}
                      >
                        X
                      </RemoveButton>
                    </ProductItem>
                  </li>
                ))}
              </ul>
            </ProductSection>
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
