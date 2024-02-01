import Form from "../../components/common/Form";
import Button from "../../components/common/Button";
import { Alert, Success } from "../../components/common/Alert.style";
import useWarehouseForm from "./Warehouse.logic";

const WarehouseForm = () => {
  const { warehouse, handleChange, handleSubmit } = useWarehouseForm();

  return (
    <>
      <section>
        {warehouse.success ? (
          <Success className="success">
            <h1 aria-live="assertive">Warehouse added successfully</h1>
          </Success>
        ) : (
          <Alert className={warehouse.errMsg ? "errmsg" : "offscreen"}>
            <p aria-live="assertive">{warehouse.errMsg}</p>
          </Alert>
        )}
        <Form title="Warehouse Page" onSubmit={handleSubmit}>
          <label htmlFor="name">Warehouse name</label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="off"
            required
            value={warehouse.name}
            onChange={handleChange}
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            autoComplete="off"
            required
            value={warehouse.address}
            onChange={handleChange}
          />
          <label htmlFor="product-type">Product Type</label>
          <select
            name="type"
            id="product-type"
            required
            value={warehouse.type}
            onChange={handleChange}
          >
            <option value="solid">solid</option>
            <option value="liquid">liquid</option>
          </select>
          <Button type="submit">Add warehouse</Button>
        </Form>
      </section>
    </>
  );
};

export default WarehouseForm;
