import styled from "styled-components";

export const NavDiv = styled.div`
  background: #fff;
  width: 100%;
  height: 4rem;
  padding: 1rem 0;
  margin-bottom: 1rem;
  padding: 0 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    padding: 15px 0;
  }

  @media (max-width: 768px) {
    .logo {
      padding: 0;
    }
  }
`;
