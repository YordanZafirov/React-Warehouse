import WarehouseForm from "./WarehouseForm";
import ListWarehouse from "./ListWarehouse";
import { useState } from "react";
import Button, { ButtonDiv } from "../../components/common/Button";
import useWarehouse from "../../hooks/Warehouse/Warehouse.hook";
import Loader from "../../components/loader/Loader";

const Warehouse = () => {
  const [toggle, setToggle] = useState(false);
  const {isLoading} = useWarehouse();

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
          {toggle ? "List Warehouses" : "Add Warehouse"}
        </Button>
      </ButtonDiv>

      {toggle ? <WarehouseForm /> : <ListWarehouse />}
    </div>
  );
};

export default Warehouse;
