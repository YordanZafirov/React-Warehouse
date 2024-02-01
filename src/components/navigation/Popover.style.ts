import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface PopoverProps {
  show: boolean;
}

export const PopoverContainer = styled.div<PopoverProps>`
  position: absolute;
  top: 100%;
  right: 0;
  display: ${({ show }) => (show ? "block" : "none")};
  z-index: 1000;
`;

export const PopoverContent = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const PopoverLink = styled(NavLink)`
  text-decoration: none;
  color: #333;
  display: block;
  padding: 8px;

  .logout{
    background-color: #ff3333;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const ProfileSpan = styled.span`
  cursor: pointer;

  &:hover {
    color: #999;
  }
`;
