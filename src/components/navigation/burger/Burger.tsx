import RightNav from "../right-nav/RightNav";
import useBurger from "./Burger.logic";
import { BurgerDiv } from "./Burger.style";

const Burger = () => {
  const { open, handleClick } = useBurger();
  return (
    <>
      <BurgerDiv open={open} onClick={handleClick}>
        <div></div>
        <div></div>
        <div></div>
      </BurgerDiv>
      <RightNav open={open} handleClick={handleClick} />
    </>
  );
};

export default Burger;
