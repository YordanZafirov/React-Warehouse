import { useEffect, useState } from "react";

const useRightNav = (handleClick: ()=> void) => {
  const [showPopover, setShowPopover] = useState(false);

  const handleProfileClick = () => {
    setShowPopover(!showPopover);
  };

  const handlePopoverClose = () => {
    setShowPopover(false);
  };

  const handleCloseNav = () => {
    handleClick();
    handlePopoverClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showPopover && !target.closest("#popover-content")) {
        handlePopoverClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopover]);
  return {
    showPopover,
    handleProfileClick,
    handlePopoverClose,
    handleCloseNav,
  };
};

export default useRightNav;
