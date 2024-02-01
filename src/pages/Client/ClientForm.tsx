import Button from "../../components/common/Button";
import Form from "../../components/common/Form";
import { Alert, Success } from "../../components/common/Alert.style";
import useClientForm from "./Client.logic";

const ClientForm = () => {
  const { client, handleChange, handleSubmit } = useClientForm();
  return (
    <>
      <section>
        {client.success ? (
          <Success className="success">
            <h1 aria-live="assertive">Client added successfully</h1>
          </Success>
        ) : (
          <Alert className={client.errMsg ? "errmsg" : "offscreen"}>
            <p aria-live="assertive">{client.errMsg}</p>
          </Alert>
        )}

        <Form title="Clients Page" onSubmit={handleSubmit}>
          <label htmlFor="accountable-person">Accountable Person</label>
          <input
            type="text"
            name="accountablePerson"
            id="accountable-person"
            autoComplete="off"
            required
            value={client.accountablePerson}
            onChange={handleChange}
          />
          <label htmlFor="user-name">User Name</label>
          <input
            type="text"
            name="userName"
            id="user-name"
            autoComplete="off"
            required
            value={client.userName}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            required
            value={client.email}
            onChange={handleChange}
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            autoComplete="off"
            required
            value={client.address}
            onChange={handleChange}
          />
          <Button>Submit</Button>
        </Form>
      </section>
    </>
  );
};

export default ClientForm;
