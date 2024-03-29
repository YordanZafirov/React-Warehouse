import Button from "../../../components/button/Button";
import Form from "../../../components/form/Form";
import { Alert, Success } from "../../../components/alert/Alert.style";
import useProductForm from "./CreateProduct.logic";

const ProductForm = () => {
  const { product, handleChange, handleSubmit } = useProductForm();

  return (
    <>
      <section>
        {product.success ? (
          <Success className="success">
            <h1 aria-live="assertive">Product added successfully</h1>
          </Success>
        ) : (
          <Alert className={product.errMsg ? "errmsg" : "offscreen"}>
            <p aria-live="assertive">{product.errMsg}</p>
          </Alert>
        )}

        <Form title="Create Product" onSubmit={handleSubmit}>
          <label htmlFor="name">Product name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            autoComplete="off"
            value={product.name}
            onChange={handleChange}
          />
          <label htmlFor="unit-type">Unit Type</label>
          <select
            name="unitType"
            id="unit-type"
            required
            value={product.unitType}
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
            value={product.type}
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

export default ProductForm;
