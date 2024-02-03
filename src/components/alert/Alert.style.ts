import styled from "styled-components";

export const StyledAuth = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
`;

export const Alert = styled.div`
  width: 30%;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  border-radius: 0.5rem;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  margin-bottom: 1rem;

  p{
    margin: 0;
  }

  &.errmsg{
    display: block;
  }

  &.offscreen{
    display: none;
  }
`;

export const Success = styled(Alert)`
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
`;