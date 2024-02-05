import { useEffect, useState } from "react";
import Form from "../../../components/form/Form";
import useUpdateClient from "./UpdateClient.logic";
import Button from "../../../components/button/Button";
import Loader from "../../../components/loader/Loader";
import { Alert, Success } from "../../../components/alert/Alert.style";

const UpdateClient = () => {
  const { client, alert, setAlert, isLoading, error, updateClient } =
    useUpdateClient();

  useEffect(() => {
    if (!isLoading && !error) {
      // Only update the state if data is available
      setUpdatedClient((prevClient) => ({
        ...prevClient,
        accountablePerson: client.accountablePerson || "",
        userName: client.userName || "",
        email: client.email || "",
        address: client.address || "",
      }));
    }
  }, [client, isLoading, error]);

  const [updatedClient, setUpdatedClient] = useState({
    accountablePerson: "",
    userName: "",
    email: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUpdatedClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!updatedClient.accountablePerson.trim()) {
      setAlert((prevAlert) => ({
        ...prevAlert,
        errMsg: "Accountable person is required",
      }));
    } else if (!updatedClient.userName.trim()) {
      setAlert((prevAlert) => ({
        ...prevAlert,
        errMsg: "Username is required",
      }));
    } else if (!updatedClient.email.trim()) {
      setAlert((prevAlert) => ({
        ...prevAlert,
        errMsg: "Email is required",
      }));
    } else if (!updatedClient.address.trim()) {
      setAlert((prevAlert) => ({
        ...prevAlert,
        errMsg: "Address is required",
      }));
    } else {
      const requestBody = Object.fromEntries(
        Object.entries(updatedClient).filter(([key, value]) => value !== "")
      );
      updateClient(requestBody);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {alert.success ? (
        <Success>
          <h1>Client updated successfully</h1>
        </Success>
      ) : (
        <>
          <Alert className={alert.errMsg ? "errmsg" : "offscreen"}>
            <p aria-live="assertive">{alert.errMsg}</p>
          </Alert>
        </>
      )}
      <Form title="Update Client" onSubmit={handleSubmit}>
        <label htmlFor="accountablePerson">Accountable Person</label>
        <input
          type="text"
          id="accountablePerson"
          name="accountablePerson"
          value={updatedClient.accountablePerson}
          onChange={handleChange}
          required
        />

        <label htmlFor="userName">Username</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={updatedClient.userName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={updatedClient.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={updatedClient.address}
          onChange={handleChange}
          required
        />

        <Button>Update</Button>
      </Form>
    </div>
  );
};

export default UpdateClient;
