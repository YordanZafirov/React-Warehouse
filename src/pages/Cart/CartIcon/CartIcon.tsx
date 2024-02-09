import { RiShoppingCartLine } from "react-icons/ri";
import { useCart } from "../../../context/CartContext";
import { CartCount, StyledCartIcon } from "./CartIcon.style";
import { CartIconProps } from "./CartIcon.static";

const CartIcon = ({ onClick }: CartIconProps) => {
  const { items } = useCart();
  return (
    <StyledCartIcon onClick={onClick}>
      <RiShoppingCartLine className="cart-icon" />
      {items.length > 0 && (
        <CartCount className="cart-count">{items.length}</CartCount>
      )}
    </StyledCartIcon>
  );
};

export default CartIcon;
