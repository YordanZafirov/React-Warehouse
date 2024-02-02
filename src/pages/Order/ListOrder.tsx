import { CenteredH1, StyledTable } from "../../components/table/Listing.style";
import Invoice from "../Invoice/Invoice";

import useOrder from "./Order.logic";
import useClient from "../../hooks/Client/Client.hook";
import useWarehouse from "../../hooks/Warehouse/Warehouse.hook";

const ListOrder = () => {
  const { orders, isLoading, error, deleteOrder } = useOrder();
  const { clients } = useClient();
  const { warehouses } = useWarehouse();

  if (error) {
    return <p>Error fetching orders: {error.message}</p>;
  }

  const getClientName = (clientId: string) => {
    const client = clients?.find((client) => client.id === clientId);
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{getClientName(order.clientId)}</td>
              <td>{getWarehouseName(order.warehouseId)}</td>
              <td>{order.createdAt}</td>
              <td>
                <button className="update">Invoice</button>
                <button onClick={() => deleteOrder(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Invoice />
    </>
  );
};

export default ListOrder;
