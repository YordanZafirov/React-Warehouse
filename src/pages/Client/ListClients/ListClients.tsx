import { Link } from "react-router-dom";
import { StyledTable, CenteredH1 } from "../../../components/table/Table.style";
import useGetClient from "../../../hooks/Client/Client.hook";
import useToken from "../../../hooks/Token/Token.hook";
import { Client } from "./Client.static";
import useDeleteClient from "./DeleteClients.logic";
import { ToastContainer } from "react-toastify";

const ListClients = () => {
  const { clients, error } = useGetClient();
  const { deleteClient, permanentDeleteClient } = useDeleteClient();
  const decodedToken = useToken();

  if (error) {
    return <p>Error fetching clients: {error.message}</p>;
  }

  return (
    <div>
      {!clients && <p>No clients found</p>}
      <ToastContainer />
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
              <td data-label="Accountble Person:">{client.accountablePerson}</td>
              <td data-label="Useer Name:">{client.userName}</td>
              <td data-label="Email:">{client.email}</td>
              <td data-label="Address:">{client.address}</td>
              <td data-label="Created at:">{client.createdAt.toLocaleString()}</td>
              <td data-label="Updated at:">{client.updatedAt.toLocaleString()}</td>
              {decodedToken?.role !== "VIEWER" && (
                <td>
                  <Link to={`/client/${client.id}`} className="update">
                    Edit
                  </Link>
                  <button onClick={() => deleteClient(client.id)}>
                    Delete
                  </button>
                  {decodedToken?.role === "OWNER" && (
                    <button
                      className="permanent-delete"
                      onClick={() => permanentDeleteClient(client.id)}
                    >
                      Permanent Delete
                    </button>
                  )}
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
