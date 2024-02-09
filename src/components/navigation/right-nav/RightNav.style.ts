import styled from "styled-components";
import { NavProps } from "./RightNav.static";

export const Ul = styled.ul<NavProps>`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  li {
    padding: 18px 10px;
    font-size: 1.2rem;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  .nav-link:hover {
    color: #999;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: center;
    background-color: #333;
    overflow-y: hidden;

    position: fixed;
    transform: ${({ open }: NavProps) =>
      open ? "translateX(0)" : "translateX(100%)"};
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    z-index: 1;

    li {
      color: #fff;
      margin-top: 20px;
      border-bottom: 1px solid #fff;
    }
  }
`;
