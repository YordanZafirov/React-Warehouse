import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";

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

interface NavProps {
  open: boolean;
}

const StyledProfile = styled.div`
  position: relative;
`;

const RightNav: React.FC<NavProps> = ({ open }) => {
  const { isAuthenticated, logout } = useAuth();
  const validToken = localStorage.getItem("accessToken");
  const [showPopover, setShowPopover] = useState(false);
  const [decodedToken, setDecodedToken] = useState<any | null>(null);

  useEffect(() => {
    if (validToken) {
      // Decode the token and set the decoded information
      const decoded = jwtDecode(validToken);
      setDecodedToken(decoded);
    }
  }, [validToken]);

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

  return (
    <nav>
      <Ul open={open}>
        {isAuthenticated ? (
          <>
            {" "}
            <CartIcon onClick={openCartModal} />
            <CartModal ref={cartModalRef} />
            <NavLink to={route.client}>
              <li>Clients</li>
            </NavLink>
            <NavLink to={route.product}>
              <li>Products</li>
            </NavLink>
            <NavLink to={route.warehouse}>
              <li>Warehouses</li>
            </NavLink>
            <NavLink to={route.order}>
              <li>Orders</li>
            </NavLink>
            <StyledProfile>
              <ProfileSpan onClick={handleProfileClick}>
                <li>Profile</li>
              </ProfileSpan>
              {showPopover && (
                <PopoverContainer show={showPopover}>
                  <PopoverContent>
                    {/* Display email and role from decoded token */}
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
            <NavLink to={route.register}>
              <li>Register</li>
            </NavLink>
            <NavLink to={route.login}>
              <li>Login</li>
            </NavLink>
          </>
        )}
      </Ul>
    </nav>
  );
};

export default RightNav;
