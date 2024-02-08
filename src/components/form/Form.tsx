import { StyledForm } from "./Form.style";

interface FormProps {
  title: string;
  action?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

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
