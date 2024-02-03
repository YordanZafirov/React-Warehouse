import { CenteredH1, StyledTable } from "../../components/table/Listing.style";
import Invoice from "../Invoice/Invoice";

import useOrder from "./Order.logic";
import useToken from "../../hooks/Token/Token.hook";
import { Client } from "../Client/ListClients/Client.static";
import useGetClient from "../../hooks/Client/Client.hook";
import useGetWarehouse from "../../hooks/Warehouse/Warehouse.hook";

const ListOrder = () => {
  const { orders, error, deleteOrder } = useOrder();
  const { clients } = useGetClient();
  const { warehouses } = useGetWarehouse();
  const decodedToken = useToken();

  if (error) {
    return <p>Error fetching orders: {error.message}</p>;
  }

  const getClientName = (clientId: string) => {
    const client = clients?.find((client: Client) => client.id === clientId);
    return client ? client.accountablePerson : "Unknown Client";
  };

  const getWarehouseName = (warehouseId: string) => {
    const warehouse = warehouses?.find(
      (warehouse) => warehouse.id === warehouseId
    );
    return warehouse ? warehouse.name : "Unknown Warehouse";
  };

  return (
    <>
      <CenteredH1>List of all orders</CenteredH1>
      <StyledTable>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Client</th>
            <th>Warehouse</th>
            <th>CreatedAt</th>
            {decodedToken?.role !== "VIEWER" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{getClientName(order.clientId)}</td>
              <td>{getWarehouseName(order.warehouseId)}</td>
              <td>{order.createdAt}</td>
              {decodedToken?.role !== "VIEWER" && (
                <td>
                  <button className="update">Invoice</button>
                  <button onClick={() => deleteOrder(order.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Invoice />
    </>
  );
};

export default ListOrder;
