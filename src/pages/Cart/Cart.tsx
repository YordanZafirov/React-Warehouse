import { useEffect } from "react";
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

import { Client } from "../Client/ListClients/Client.static";
import useGetClient from "../../hooks/Client/Client.hook";
import useGetWarehouse from "../../hooks/Warehouse/Warehouse.hook";
import { Warehouse } from "../Warehouse/WarehouseForm/Warehouse.static";
import useCartModal from "./Cart.logic";

const Cart: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const { items, clearCart, removeItem } = useCart();
  const { clients } = useGetClient();
  const { warehouses } = useGetWarehouse();
  const {
    order,
    setOrder,
    products,
    filteredWarehouses,
    setFilteredWarehouses,
    fetchProducts,
    handleChange,
    handleProductChange,
    handleSubmit
  } = useCartModal(onSubmit);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Set default order details
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
  }, [clients, warehouses, setOrder]);

  // Filter warehouses based on product type
  useEffect(() => {
    if (products.length > 0) {
      const filteredWarehouses = warehouses?.filter(
        (warehouse: Warehouse) => warehouse.type === products[0]?.type
      );
      setFilteredWarehouses(filteredWarehouses);
    }
  }, [products, warehouses]);

  return (
    <>
      {items.length === 0 ? (
        <NoItemsParagraph>No items in the cart!</NoItemsParagraph>
      ) : (
        <ModalForm title="Cart" onSubmit={handleSubmit}>
          <FormRow>
            <label className="select-label" htmlFor="order-type">
              Order Type:
            </label>
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
            <label className="select-label" htmlFor="client">
              Client:
            </label>
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
            <label className="select-label" htmlFor="warehouse">
              Warehouse:
            </label>
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
                        <label
                          className="input-label"
                          htmlFor={`unitPrice_${product.id}`}
                        >
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
