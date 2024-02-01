import styled from "styled-components";

export const CenteredH1 = styled.h1`
text-align: center;
margin-top: 50px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  thead {
    background-color: #d7d7d7;
  }

  th {
    padding: 12px;
  }

  tbody {
    background-color: #ffffff;
  }

  td {
    padding: 12px;
    text-align: center;
  }

  button {
    background-color: #ff3333;
    color: #ffffff;
    padding: 8px 12px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
  }

  .add{
    background-color: #00cc00;
    margin: 0 5px;
  }

  .update{
    background-color: #ffcc00;
    color: #000;
    margin: 0 5px;

  }

  tr:nth-child(even){
    background-color: #f2f2f2;
  }
`;
