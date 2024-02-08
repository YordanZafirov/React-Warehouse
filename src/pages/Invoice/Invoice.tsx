import { Warehouse } from "../Warehouse/WarehouseForm/Warehouse.static";
import useGetClient from "../../hooks/Client/Client.hook";
import useGetWarehouse from "../../hooks/Warehouse/Warehouse.hook";
import useOrder from "../Order/Order.logic";
import useGetInvoice from "../../hooks/Invoice/Invoice.hook";
import { CenteredH1, StyledTable } from "../../components/table/Table.style";
import useGetOrderDetails from "./GetOrderDetails.logic";
import { Client } from "../Client/ListClients/Client.static";
import { OrderDetail } from "./Invoice.static";
import { useEffect, useState } from "react";

const Invoice = () => {
  const { orders } = useOrder();
  const { orderDetails } = useGetOrderDetails();
  const { invoice } = useGetInvoice();
  const { clients } = useGetClient();
  const { warehouses } = useGetWarehouse();

  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Function to calculate total price
  const calculateTotalPrice = () => {
    let total = 0;
    orderDetails?.forEach((orderDetail: OrderDetail) => {
      total += orderDetail.unitPrice * orderDetail.quantity;
    });
    return total;
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [orderDetails]);

  const getClientName = (clientId: string) => {
    const client = clients.find((client: Client) => client.id === clientId);
    return client ? client.accountablePerson : "Unknown Client";
  };

  const getWarehouseName = (warehouseId: string) => {
    const warehouse = warehouses?.find(
      (warehouse: Warehouse) => warehouse.id === warehouseId
    );
    return warehouse ? warehouse.name : "Unknown Warehouse";
  };

  return (
    <>
      <CenteredH1>Invoice Number: {invoice?.number}</CenteredH1>
      <StyledTable>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Client</th>
            <th>Warehouse</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails?.map((orderDetail: OrderDetail) => {
            const associatedOrder = orders?.find(
              (order) => order.id === orderDetail.orderId.id
            );

            if (associatedOrder) {
              return (
                <tr key={orderDetail.id}>
                  <td data-label="Order ID:">{orderDetail.orderId.id}</td>
                  <td data-label="Client:">{getClientName(associatedOrder.clientId)}</td>
                  <td data-label="Warehouse:">{getWarehouseName(associatedOrder.warehouseId)}</td>
                  <td data-label="Product:">
                    {orderDetail.productId
                      ? orderDetail.productId.name
                      : "Unknown Product"}
                  </td>
                  <td data-label="Quantity:">{orderDetail.quantity}</td>
                  <td data-label="Unit Price:">€{orderDetail.unitPrice}</td>
                  <td data-label="Price:">€{orderDetail.unitPrice * orderDetail.quantity}</td>
                </tr>
              );
            } else {
              return null;
            }
          })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="total-price-string">Total Price:</td>
            <td className="total-price-value">€{totalPrice}</td>
          </tr>
        </tbody>
      </StyledTable>
    </>
  );
};

export default Invoice;
