import { useState } from "react";
import { BurgerDiv } from "./Navigation.style";
import RightNav from "./RightNav";

const Burger = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <BurgerDiv open={open} onClick={handleClick}>
        <div></div>
        <div></div>
        <div></div>
      </BurgerDiv>
      <RightNav open={open} handleClick={handleClick}/>
    </>
  );
};

export default Burger;
