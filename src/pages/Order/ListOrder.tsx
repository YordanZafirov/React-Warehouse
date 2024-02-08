import { CenteredH1, StyledTable } from "../../components/table/Table.style";
import useOrder from "./Order.logic";
import useToken from "../../hooks/Token/Token.hook";
import { Client } from "../Client/ListClients/Client.static";
import useGetClient from "../../hooks/Client/Client.hook";
import useGetWarehouse from "../../hooks/Warehouse/Warehouse.hook";
import { Order } from "./Order.static";
import { Warehouse } from "../Warehouse/WarehouseForm/Warehouse.static";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const ListOrder = () => {
  const { orders, error, isLoading, deleteOrder, permanentDeleteOrder } =
    useOrder();
  const { clients } = useGetClient();
  const { warehouses } = useGetWarehouse();
  const decodedToken = useToken();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error fetching orders: {error.message}</p>;
  }

  // Function to get client name
  const getClientName = (clientId: string) => {
    const client = clients?.find((client: Client) => client.id === clientId);
    return client ? client.accountablePerson : "Unknown Client";
  };

  // Function to get warehouse name
  const getWarehouseName = (warehouseId: string) => {
    const warehouse = warehouses?.find(
      (warehouse: Warehouse) => warehouse.id === warehouseId
    );
    return warehouse ? warehouse.name : "Unknown Warehouse";
  };

  return (
    <>
      {!orders && <p>No orders found</p>}
      <ToastContainer />
      <CenteredH1>List of all orders</CenteredH1>
      <StyledTable>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Type</th>
            <th>Client</th>
            <th>Warehouse</th>
            <th>CreatedAt</th>
            {decodedToken?.role !== "VIEWER" && (
              <>
                <th>Invoices</th>
                <th>Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {orders?.map((order: Order) => (
            <tr key={order.id}>
              <td data-label="Order ID:">{order.id}</td>
              <td data-label="Order Type:">{order.type}</td>
              <td data-label="Client:">{getClientName(order.clientId)}</td>
              <td data-label="Warehouse:">
                {getWarehouseName(order.warehouseId)}
              </td>
              <td data-label="Created at:">{order.createdAt}</td>
              {decodedToken?.role !== "VIEWER" && (
                <>
                  <td>
                    {order.type === "stock picking" && (
                      <div className="button-container">
                        <Link className="update" to={`/invoice/${order.id}`}>
                          Invoice
                        </Link>
                      </div>
                    )}
                  </td>
                  <td>
                    <button onClick={() => deleteOrder(order.id)}>
                      Delete
                    </button>
                    {decodedToken?.role === "OWNER" && (
                      <button
                        className="permanent-delete"
                        onClick={() => permanentDeleteOrder(order.id)}
                      >
                        Permanent Delete
                      </button>
                    )}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </>
  );
};

export default ListOrder;
