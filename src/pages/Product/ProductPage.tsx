import { useState } from "react";

import ListProducts from "./ListProduct";
import ProductForm from "./ProductForm";
// import { PageContainer } from "../../common/Page.style";
import Button, { ButtonDiv } from "../../components/common/Button";
import useProduct from "../../hooks/Product/Product.hook";
import Loader from "../../components/loader/Loader";

const ProductPage = () => {
  const [toggle, setToggle] = useState(false);
  const {isLoading} = useProduct();

  if (isLoading) {
    return <Loader />;
  }

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
