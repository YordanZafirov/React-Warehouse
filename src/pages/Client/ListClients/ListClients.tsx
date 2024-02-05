import {
  StyledTable,
  CenteredH1,
} from "../../../components/table/Listing.style";
import useGetClient from "../../../hooks/Client/Client.hook";
import useToken from "../../../hooks/Token/Token.hook";
import { Client } from "./Client.static";
import useDeleteClient from "./ListClients.logic";

const ListClients = () => {
  const { clients, error } = useGetClient();
  const { deleteClient } = useDeleteClient();
  const decodedToken = useToken();

  if (error) {
    return <p>Error fetching clients: {error.message}</p>;
  }

  return (
    <div>
      {!clients && <p>No clients found</p>}
      <CenteredH1>List of all clients</CenteredH1>
      <StyledTable>
        <thead>
          <tr>
            <th>Accountable Person</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Created At</th>
            <th>Updated At</th>
            {decodedToken?.role !== "VIEWER" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {clients?.map((client: Client) => (
            <tr key={client.id}>
              <td>{client.accountablePerson}</td>
              <td>{client.userName}</td>
              <td>{client.email}</td>
              <td>{client.address}</td>
              <td>{client.createdAt.toLocaleString()}</td>
              <td>{client.updatedAt.toLocaleString()}</td>
              {decodedToken?.role !== "VIEWER" && (
                <td>
                  <button className="update">Edit</button>
                  <button onClick={() => deleteClient(client.id)}>
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

export default ListClients;
