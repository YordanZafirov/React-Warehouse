import styled from "styled-components";

interface NavProps {
  open: boolean;
}

export const NavDiv = styled.div`
  background: #fff;
  width: 100%;
  height: 4rem;
  padding: 1rem 0;
  margin-bottom: 1rem;
  padding-right: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  display: flex;
  justify-content: space-between;

  .logo {
    padding: 15px 0;
  }

  @media (max-width: 768px) {
    .logo {
      padding: 0;
    }
  }
`;

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

  a:hover {
    color: #999;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: center;
    background-color: #333;
    
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

export const BurgerDiv = styled.div<NavProps>`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  border-radius: 0.25rem;
  z-index: 20;

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? "#fff" : "#333")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
      background-color: ${({ open }) => (open ? "#fff" : "#333")};
    }
  }

  @media (min-width: 769px) {
    display: none;
  }
`;
