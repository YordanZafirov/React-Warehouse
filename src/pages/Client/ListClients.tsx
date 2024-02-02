import Loader from "../../components/loader/Loader";
import { StyledTable, CenteredH1 } from "../../components/table/Listing.style";
import useClient from "../../hooks/Client/Client.hook";
import { Client } from "./Client.static";

const ListClients = () => {
  const { clients, error, deleteClient } = useClient();

  if (error) {
    return <p>Error fetching clients: {error.message}</p>;
  }

  return (
    <div>
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
            <th>Actions</th>
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
              <td>
                <button className="update">Edit</button>
                <button onClick={() => deleteClient(client.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default ListClients;
