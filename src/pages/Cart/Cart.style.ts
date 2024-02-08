import styled from "styled-components";

export const Modal = styled.dialog`
  width: 50%;
  height: 80%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 #ccc;
  padding: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    width: 90vw;
    height: 90vh;
  }
`;

export const NoItemsParagraph = styled.p`
  text-align: center;
  font-size: 18px;
  margin: 20px 0;
`;

export const ModalForm = styled.form`
  max-width: 85%;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;

  label {
    display: block;
    margin-bottom: 8px;
  }

  h2 {
    font-size: 18px;
    margin-bottom: 8px;
  }

  ul {
    list-style: none;
    padding: 0;
    position: relative;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 16px;
    }
  }
`;

export const ProductSection = styled.div`
  margin-top: 20px;

  li{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    position: relative;
  }
`;

export const ProductItem = styled.div`
  position: relative;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 16px;
  

  .product-name {
    font-size: 16px;
    margin-right: 16px;
    margin-bottom: 10px;
    color: #000;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  label {
    margin-right: 10px;
    color: #000;
  }

  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 20%;
  }

  @media (max-width: 768px) {
    label {
      display: block;
      margin-bottom: 4px;
      font-size: 14px;
    }
  }
`;

export const ModalInputField = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 50px;
  margin-left: 10px;
  margin-bottom: 5px;

  /* @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  } */
`;

export const FormRow = styled.div`
  margin-bottom: 1.7rem;

  label {
    margin-right: 1rem;
  }

  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

export const ModalButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalButton = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

export const ClearButton = styled(ModalButton)`
  background-color: #e74c3c;
  margin-right: 10px;

  &:hover {
    background-color: #c0392b;
  }
`;

export const RemoveButton = styled(ModalButton)`
  background-color: #e74c3c;
  padding: 5px 10px;
  font-size: 10px;
  position: absolute;
  top: 5px;
  right: 5px;

  &:hover {
    background-color: #c0392b;
  }
`;

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

export const CloseModalButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  background-color: #ccc;
  z-index: 2;
`;
