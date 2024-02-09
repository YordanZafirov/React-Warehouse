import styled from "styled-components";

export const StyledCartIcon = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 30px;

  .cart-icon {
    height: 28px;
    width: 28px;
    margin-top: 10px;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    margin-right: 10px;
  }
`;

export const CartCount = styled.span`
  position: absolute;
  top: 0;
  right: -10px;
  background-color: #3498db;
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;