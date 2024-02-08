import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { route } from "../../static/router/Routes";

import { Ul } from "./Navigation.style";
import {
  PopoverContainer,
  PopoverContent,
  PopoverLink,
  ProfileSpan,
} from "./Popover.style";
import { useAuth } from "../../context/AuthContext";
import CartIcon from "../../pages/Cart/CartIcon";
import CartModal, { ModalInstance } from "../../pages/Cart/CartModal";
import useToken from "../../hooks/Token/Token.hook";

interface NavProps {
  open: boolean;
  handleClick: () => void;
}

const StyledProfile = styled.div`
  position: relative;
`;

const RightNav: React.FC<NavProps> = ({ open, handleClick }) => {
  const { isAuthenticated, logout } = useAuth();
  const [showPopover, setShowPopover] = useState(false);
  const decodedToken = useToken();

  const handleProfileClick = () => {
    setShowPopover(!showPopover);
  };

  const handlePopoverClose = () => {
    setShowPopover(false);
  };

  const cartModalRef = useRef<ModalInstance | null>(null);

  const openCartModal = () => {
    if (cartModalRef.current) {
      cartModalRef.current.open();
    }
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

  return (
    <nav>
      <Ul open={open}>
        {isAuthenticated ? (
          <>
            {decodedToken && decodedToken?.role !== "VIEWER" && (
              <>
                <CartIcon onClick={openCartModal} />
                <CartModal ref={cartModalRef} />
              </>
            )}
            <NavLink
              className="nav-link"
              to={route.client}
              onClick={handleCloseNav}
            >
              <li>Clients</li>
            </NavLink>
            <NavLink
              className="nav-link"
              to={route.product}
              onClick={handleCloseNav}
            >
              <li>Products</li>
            </NavLink>
            <NavLink
              className="nav-link"
              to={route.warehouse}
              onClick={handleCloseNav}
            >
              <li>Warehouses</li>
            </NavLink>
            <NavLink
              className="nav-link"
              to={route.order}
              onClick={handleCloseNav}
            >
              <li>Orders</li>
            </NavLink>
            <NavLink
              className="nav-link"
              to={route.report}
              onClick={handleCloseNav}
            >
              <li>Reports</li>
            </NavLink>
            <StyledProfile>
              <ProfileSpan onClick={handleProfileClick}>
                <li>Profile</li>
              </ProfileSpan>
              {showPopover && (
                <PopoverContainer show={showPopover}>
                  <PopoverContent id="popover-content">
                    <div>Email: {decodedToken?.email}</div>
                    <div>Role: {decodedToken?.role}</div>
                    <PopoverLink
                      className="logout"
                      to={route.login}
                      onClick={() => {
                        logout();
                        handlePopoverClose();
                      }}
                    >
                      Logout
                    </PopoverLink>
                  </PopoverContent>
                </PopoverContainer>
              )}
            </StyledProfile>
          </>
        ) : (
          <>
            {" "}
            <NavLink to={route.register} onClick={handleCloseNav}>
              <li>Register</li>
            </NavLink>
            <NavLink to={route.login} onClick={handleCloseNav}>
              <li>Login</li>
            </NavLink>
          </>
        )}
      </Ul>
    </nav>
  );
};

export default RightNav;
