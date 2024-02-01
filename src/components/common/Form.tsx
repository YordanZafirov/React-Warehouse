import styled from "styled-components";

interface FormProps {
  title: string;
  action?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const StyledForm = styled.form`
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

const Form: React.FC<FormProps> = ({
  title,
  action = "",
  onSubmit,
  children,
}) => {
  return (
    <StyledForm action={action} onSubmit={onSubmit}>
      <h1>{title}</h1>
      {children}
    </StyledForm>
  );
};

export default Form;
