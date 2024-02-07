import { Alert, Success } from "../../../components/alert/Alert.style";
import Button from "../../../components/button/Button";
import Form from "../../../components/form/Form";
import useUpdateWarehouse from "./UpdateWarehouse.logic";
import { useEffect, useState } from "react";

const UpdateWarehouse = () => {
  const { warehouse, isLoading, error, updateWarehouse, alert, setAlert } =
    useUpdateWarehouse();

  useEffect(() => {
    if (!isLoading && !error) {
      setUpdatedWarehouse({
        name: warehouse.name || "",
        address: warehouse.address || "",
        type: warehouse.type || "solid",
      });
    }
  }, [warehouse, isLoading, error]);

  const [updatedWarehouse, setUpdatedWarehouse] = useState({
    name: "",
    address: "",
    type: "solid",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setUpdatedWarehouse((prevWarehouse) => ({
      ...prevWarehouse,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!updatedWarehouse.name.trim() || !updatedWarehouse.address.trim()) {
      setAlert((prevAlert) => ({
        ...prevAlert,
        errMsg: "All inputs are required",
      }));
    } else {
      const requestBody = Object.fromEntries(
        Object.entries(updatedWarehouse).filter(([key, value]) => value !== "")
      );
      updateWarehouse(requestBody);
    }
  };

  return (
    <>
      <section>
        {alert.success ? (
          <Success className="success">
            <h1 aria-live="assertive">Warehouse added successfully</h1>
          </Success>
        ) : (
          <Alert className={alert.errMsg ? "errmsg" : "offscreen"}>
            <p aria-live="assertive">{alert.errMsg}</p>
          </Alert>
        )}
        <Form title="Update Warehouse" onSubmit={handleSubmit}>
          <label htmlFor="name">Warehouse name</label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="off"
            required
            value={updatedWarehouse.name}
            onChange={handleChange}
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            autoComplete="off"
            required
            value={updatedWarehouse.address}
            onChange={handleChange}
          />
          <label htmlFor="product-type">Product Type</label>
          <select
            name="type"
            id="product-type"
            required
            value={updatedWarehouse.type}
            onChange={handleChange}
          >
            <option value="solid">solid</option>
            <option value="liquid">liquid</option>
          </select>
          <Button>Add warehouse</Button>
        </Form>
      </section>
    </>
  );
};

export default UpdateWarehouse;
