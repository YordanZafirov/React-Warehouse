import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 50%;
  h1 {
    margin-bottom: 3rem;
  }
  label {
    margin-top: 1rem;
    font-size: 1.2rem;
  }
  input {
    margin-top: 0.5rem;
    width: 30%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1.2rem;
  }
  select {
    margin-top: 0.5rem;
    width: 30%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1.2rem;
  }

  @media (max-width: 1200px) {
    width: 80%;
  
    input {
      width: 50%;
    }

    select {
      width: 50%;
    }
  }

  @media(max-width: 768px) {
    width: 80%;

    input {
      width: 50%;
    }
    select {
      width: 50%;
    }
  };
`;