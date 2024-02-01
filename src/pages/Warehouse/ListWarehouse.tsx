import { useEffect } from "react";
import { CenteredH1, StyledTable } from "../../components/table/Listing.style";
import useWarehouse from "../../hooks/Warehouse/Warehouse.hook";

const ListWarehouse = () => {
  const { warehouses, getWarehouse, deleteWarehouse } = useWarehouse();

  useEffect(() => {
    getWarehouse();
  }, []);

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map((warehouse) => (
            <tr key={warehouse.id}>
              <td>{warehouse.name}</td>
              <td>{warehouse.address}</td>
              <td>{warehouse.type}</td>
              <td>{warehouse.createdAt}</td>
              <td>{warehouse.updatedAt}</td>
              <td>
                <button className="update">Edit</button>
                <button onClick={() => deleteWarehouse(warehouse.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default ListWarehouse;
