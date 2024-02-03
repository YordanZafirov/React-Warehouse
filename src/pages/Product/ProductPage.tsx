import { useState } from "react";

import ListProducts from "./ListProduct/ListProduct";
import ProductForm from "./ProductForm/ProductForm";
import Button, { ButtonDiv } from "../../components/button/Button";
import useProduct from "../../hooks/Product/Product.hook";
import Loader from "../../components/loader/Loader";
import useToken from "../../hooks/Token/Token.hook";

const ProductPage = () => {
  const { isLoading } = useProduct();
  const [toggle, setToggle] = useState(false);
  const decodedToken = useToken();

  if (decodedToken === null) {
    return <Loader />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };
  return (
    <div>
      {decodedToken?.role === "VIEWER" ? (
        <ListProducts />
      ) : (
        <div>
          <ButtonDiv>
            <Button color={toggle ? "blue" : "yellow"} onClick={handleToggle}>
              {toggle ? "List Products" : "Add Product"}
            </Button>
          </ButtonDiv>
          {toggle ? <ProductForm /> : <ListProducts />}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
