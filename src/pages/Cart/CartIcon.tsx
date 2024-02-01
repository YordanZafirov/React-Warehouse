import { RiShoppingCartLine } from "react-icons/ri";
import { useCart } from "../../context/CartContext";
import { StyledCartIcon } from "./Cart.style";

interface CartIconProps {
  onClick: () => void;
}

const CartIcon = ({ onClick }: CartIconProps) => {
  const { items } = useCart();
  return (
    <StyledCartIcon  onClick={onClick}>
      <RiShoppingCartLine className="cart-icon"/>
      {items.length > 0 && <span className="cart-count">{items.length}</span>}
    </StyledCartIcon>
  );
};

export default CartIcon;
