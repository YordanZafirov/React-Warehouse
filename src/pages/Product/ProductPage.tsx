import { useState } from "react";

import ListProducts from "./ListProduct";
import ProductForm from "./ProductForm";
// import { PageContainer } from "../../common/Page.style";
import Button, { ButtonDiv } from "../../components/common/Button";

const ProductPage = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };
  return (
    <div>
      <ButtonDiv>
        <Button color={toggle ? "blue" : "yellow"} onClick={handleToggle}>
          {toggle ? "List Products" : "Add Product"}
        </Button>
      </ButtonDiv>

      {toggle ? <ProductForm /> : <ListProducts />}
    </div>
  );
};

export default ProductPage;
