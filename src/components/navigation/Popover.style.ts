import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface PopoverProps {
  show: boolean;
}
export const PopoverContainer = styled.div<PopoverProps>`
  position: fixed;
  display: ${({ show }) => (show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const PopoverContent = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
`;

export const PopoverLink = styled(NavLink)`
  text-decoration: none;
  color: #333;
  display: flex;
  margin-top: 8px;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: #fa5252;
  border-radius: 5px;

  .logout {
    text-align: center;
  }

  &:hover {
    background-color: #f03e3e;
    color: #fff;
  }
`;

export const ProfileSpan = styled.span`
  cursor: pointer;

  &:hover {
    color: #999;
  }
`;
