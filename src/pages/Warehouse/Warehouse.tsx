import WarehouseForm from "./WarehouseForm";
import ListWarehouse from "./ListWarehouse/ListWarehouse";
import { useState } from "react";
import Button, { ButtonDiv } from "../../components/button/Button";
import useWarehouse from "../../hooks/Warehouse/Warehouse.hook";
import Loader from "../../components/loader/Loader";
import useToken from "../../hooks/Token/Token.hook";

const Warehouse = () => {
  const { isLoading } = useWarehouse();
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
        <ListWarehouse />
      ) : (
        <div>
          <ButtonDiv>
            <Button color={toggle ? "blue" : "yellow"} onClick={handleToggle}>
              {toggle ? "List Warehouses" : "Add Warehouse"}
            </Button>
          </ButtonDiv>

          {toggle ? <WarehouseForm /> : <ListWarehouse />}
        </div>
      )}
    </div>
  );
};

export default Warehouse;
