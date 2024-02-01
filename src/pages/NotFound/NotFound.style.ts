import styled from "styled-components";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;

  a {
    color: #2980b9;
    text-decoration: none;
    padding: 10px 15px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #2980b9;
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 10px;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #1864ab;
      background-color: #a5d8ff;
      
    }
  }
`;
