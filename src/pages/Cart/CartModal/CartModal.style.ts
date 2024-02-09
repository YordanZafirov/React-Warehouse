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