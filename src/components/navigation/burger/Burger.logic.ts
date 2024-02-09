import { useState } from "react";

const useBurger = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  return ( {
    open,
    handleClick,
  } );
}
 
export default useBurger;