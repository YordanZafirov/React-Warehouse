import styled from "styled-components";

export const CenteredH1 = styled.h1`
  text-align: center;
  margin-top: 50px;
`;

export const StyledTable = styled.table`
  width: 90%;
  margin: 10px auto;

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

  .button-container {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-top: 10px;
  }

  button {
    background-color: #ff3333;
    color: #ffffff;
    padding: 8px 12px;
    margin: 0 5px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
  }

  .add {
    background-color: #00cc00;
  }

  .update {
    font-size: 14px;
    padding: 8px 10px;
    border-radius: 4px;
    background-color: #ffcc00;
    text-decoration: none;
    color: #000;
  }

  .permanent-delete {
    background-color: #ff3333;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  @media (max-width: 768px) {
    th {
      display: none;
    }

    td {
      display: block;
      text-align: left;
    }

    .update {
      margin-right: auto;
    }

    td::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      margin-right: 5px;
    }

    .permanent-delete {
      margin-top: 10px;
    }

    .total-price-string {
      font-weight: 700;
      font-size: 22px;     
    }

    .total-price-value{
      font-weight: 700;
      font-size: 18px;
    }
  }
`;
