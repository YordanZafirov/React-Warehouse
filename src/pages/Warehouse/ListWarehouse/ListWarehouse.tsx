import { Link } from "react-router-dom";
import {
  CenteredH1,
  StyledTable,
} from "../../../components/table/Listing.style";
import useToken from "../../../hooks/Token/Token.hook";
import useGetWarehouse from "../../../hooks/Warehouse/Warehouse.hook";
import { Warehouse } from "../WarehouseForm/Warehouse.static";
import useDeleteWarehouse from "./DeleteWarehouse.logic";
import { ToastContainer } from "react-toastify";

const ListWarehouse = () => {
  const { warehouses, error } = useGetWarehouse();

  const { deleteWarehouse } = useDeleteWarehouse();

  const decodedToken = useToken();
  if (error) {
    return <p>Error fetching warehouses: {error.message}</p>;
  }

  return (
    <div>
      {!warehouses && <p>No warehouses found</p>}
      <ToastContainer />
      <CenteredH1>List of all warehouses</CenteredH1>
      <StyledTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Type</th>
            <th>Created at</th>
            <th>Updated at</th>
            {decodedToken?.role !== "VIEWER" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {warehouses?.map((warehouse: Warehouse) => (
            <tr key={warehouse.id}>
              <td>{warehouse.name}</td>
              <td>{warehouse.address}</td>
              <td>{warehouse.type}</td>
              <td>{warehouse.createdAt.toLocaleString()}</td>
              <td>{warehouse.updatedAt.toLocaleString()}</td>
              {decodedToken?.role !== "VIEWER" && (
                <td>
                  <Link to={`/warehouse/${warehouse.id}`} className="update">
                    Edit
                  </Link>
                  <button onClick={() => deleteWarehouse(warehouse.id)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default ListWarehouse;
