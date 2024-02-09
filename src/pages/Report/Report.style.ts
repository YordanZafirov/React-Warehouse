import styled from "styled-components";

export const ReportContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 40px auto;

  h2{
    margin-bottom: 20px;
    text-align: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    margin: 20px auto;

    h2{
      margin-bottom: 10px;
    }
  }
`;
