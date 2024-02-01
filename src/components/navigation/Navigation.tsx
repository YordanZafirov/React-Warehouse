import Burger from "./Burger";
import { NavDiv } from "./Navigation.style";

const Navigation = () => {
  return (
    <NavDiv>
      <div className="logo">Logo</div>
      <Burger />
    </NavDiv>
  );
};

export default Navigation;
