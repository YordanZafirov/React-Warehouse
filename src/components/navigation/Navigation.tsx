import Burger from "./burger/Burger";
import { NavDiv } from "./Navigation.style";

const Navigation = () => {
  return (
    <NavDiv>
      <div className="logo">Logo</div>
      <div style={{ flex: 1 }}></div>
      <Burger />
    </NavDiv>
  );
};

export default Navigation;
