import { BarLoader } from "react-spinners";
import { StyledLoader } from "./Loader.style";

const Loader = () => {
  return (
    <StyledLoader>
      <BarLoader />
    </StyledLoader>
  );
};

export default Loader;
