import Loader from "../../components/loader/Loader";
import ListOrder from "./ListOrder";
import useOrder from "./Order.logic";
const Order = () => {
  const { isLoading } = useOrder();
  
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <ListOrder />
    </div>
  );
};

export default Order;
