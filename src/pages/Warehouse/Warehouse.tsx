import WarehouseForm from "./WarehouseForm";
import ListWarehouse from "./ListWarehouse";
import { useState } from "react";
// import { PageContainer } from "../../common/Page.style";
import Button, { ButtonDiv } from "../../components/common/Button";

const Warehouse = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };
  return (
    <div>
      <ButtonDiv>
        <Button color={toggle ? "blue" : "yellow"} onClick={handleToggle}>
          {toggle ? "List Warehouses" : "Add Warehouse"}
        </Button>
      </ButtonDiv>

      {toggle ? <WarehouseForm /> : <ListWarehouse />}
    </div>
  );
};

export default Warehouse;
