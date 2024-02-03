import { CenteredH1, StyledTable } from "../../components/table/Listing.style";
import useToken from "../../hooks/Token/Token.hook";
import useWarehouse from "../../hooks/Warehouse/Warehouse.hook";

const ListWarehouse = () => {
  const { warehouses, error, deleteWarehouse } = useWarehouse();
  const decodedToken = useToken();
  if (error) {
    return <p>Error fetching warehouses: {error.message}</p>;
  }

  return (
    <div>
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
          {warehouses?.map((warehouse) => (
            <tr key={warehouse.id}>
              <td>{warehouse.name}</td>
              <td>{warehouse.address}</td>
              <td>{warehouse.type}</td>
              <td>{warehouse.createdAt.toLocaleString()}</td>
              <td>{warehouse.updatedAt.toLocaleString()}</td>
              {decodedToken?.role !== "VIEWER" && (
                <td>
                  <button className="update">Edit</button>
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
