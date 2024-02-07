import styled from "styled-components";

export const ButtonDiv = styled.div`
display: flex;
justify-content: center;
margin: 0 auto 2rem auto;
width: 40%;

`;

const StyledButton = styled.button`
  padding: 0.5rem;
  margin-top: 1rem;
  width: 30%;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }

  &.red {
    background-color: #f03e3e;
  }

  &.green {
    background-color: #37b24d;
  }

  &.yellow {
    background-color: #fcc419;
  }

  &.blue {
    background-color: #228be6;
  }

  @media (max-width: 768px) {
    width: 50%;
    font-size: 1rem;
  }

  @media (max-width: 500px) {
    width: 80%;
  }


`;

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  color?: "red" | "green" | "yellow" | "blue";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, type, color, onClick }) => {
  return <StyledButton type={type} className={color} onClick={onClick}>{children}</StyledButton>;
};

export default Button;
