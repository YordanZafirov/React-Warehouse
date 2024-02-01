import { useState } from "react";
import { Client } from "../../pages/Client/Client.static";
import { token } from "../../static/token";

const useClient = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const getClient = () => {
    fetch("http://localhost:3000/client/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: Client[]) => {
        setClients(
          data.map((client) => ({
            ...client,
            createdAt: new Date(client.createdAt),
            updatedAt: new Date(client.updatedAt),
          }))
        );
      });
  };

  const deleteClient = (id: string) => {
    fetch(`http://localhost:3000/client/soft-delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to delete client. Status: ${res.status}`);
      }
      return res.json();
    })
    .then(() => {
      setClients((prevClient) =>
        prevClient.filter((client) => client.id !== id)
      );
    })
    .catch((error) => {
      console.error("Error deleting client:", error);
    });
  };

  return { clients, getClient, deleteClient };
};

export default useClient;
