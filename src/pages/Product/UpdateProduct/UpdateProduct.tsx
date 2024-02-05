import { useEffect, useState } from "react";
import { Alert, Success } from "../../../components/alert/Alert.style";
import Button from "../../../components/button/Button";
import Form from "../../../components/form/Form";
import useUpdateProduct from "./UpdateProduct.logic";

const UpdateProduct = () => {
  const { alert, setAlert, product, isLoading, error, updateProduct } =
    useUpdateProduct();

  useEffect(() => {
    if (!isLoading && !error) {
      // Initialize the updatedProduct state with values from the product state
      setUpdatedProduct({
        name: product.name || "",
        unitType: product.unitType || "kg",
        type: product.type || "solid",
      });
    }
  }, [product, isLoading, error]);

  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    unitType: "kg",
    type: "solid",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!updatedProduct.name.trim()) {
      setAlert((prevAlert) => ({
        ...prevAlert,
        errMsg: "Product name is required",
      }));
    } else {
      const requestBody = Object.fromEntries(
        Object.entries(updatedProduct).filter(([key, value]) => value !== "")
      );
      updateProduct(requestBody);
    }
  };

  return (
    <>
      <section>
        {alert.success ? (
          <Success className="success">
            <h1 aria-live="assertive">Product added successfully</h1>
          </Success>
        ) : (
          <Alert className={alert.errMsg ? "errmsg" : "offscreen"}>
            <p aria-live="assertive">{alert.errMsg}</p>
          </Alert>
        )}

        <Form title="Product Page" onSubmit={handleSubmit}>
          <label htmlFor="name">Product name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            autoComplete="off"
            value={updatedProduct.name}
            onChange={handleChange}
          />
          <label htmlFor="unit-type">Unit Type</label>
          <select
            name="unitType"
            id="unit-type"
            required
            value={updatedProduct.unitType}
            onChange={handleChange}
          >
            <option value="kg">kg</option>
            <option value="L">L</option>
          </select>
          <label htmlFor="product-type">Product Type</label>
          <select
            name="type"
            id="product-type"
            required
            value={updatedProduct.type}
            onChange={handleChange}
          >
            <option value="solid">solid</option>
            <option value="liquid">liquid</option>
          </select>
          <Button>Add product</Button>
        </Form>
      </section>
    </>
  );
};

export default UpdateProduct;
