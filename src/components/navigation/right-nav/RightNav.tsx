import { useRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { route } from "../../../static/router/Routes";

import { Ul } from "./RightNav.style";
import {
  PopoverContainer,
  PopoverContent,
  PopoverLink,
  ProfileSpan,
} from "./Popover.style";
import { useAuth } from "../../../context/AuthContext";
import CartIcon from "../../../pages/Cart/CartIcon/CartIcon";
import CartModal from "../../../pages/Cart/CartModal/CartModal";
import { ModalInstance } from "../../../pages/Cart/CartModal/CartModal.static";
import useToken from "../../../hooks/Token/Token.hook";
import useRightNav from "./RightNav.logic";

interface NavProps {
  open: boolean;
  handleClick: () => void;
}

const StyledProfile = styled.div`
  position: relative;
`;

const RightNav: React.FC<NavProps> = ({ open, handleClick }) => {
  const { isAuthenticated, logout } = useAuth();
  const decodedToken = useToken();
  const {
    showPopover,
    handleProfileClick,
    handlePopoverClose,
    handleCloseNav,
  } = useRightNav(handleClick);

  const cartModalRef = useRef<ModalInstance | null>(null);

  const openCartModal = () => {
    if (cartModalRef.current) {
      cartModalRef.current.open();
    }
  };

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
