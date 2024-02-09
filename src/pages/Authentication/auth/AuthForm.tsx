import {  useRef, useEffect } from "react";
import {
  Alert,
  StyledAuth,
  Success,
} from "../../../components/alert/Alert.style";
import Form from "../../../components/form/Form";
import Button from "../../../components/button/Button";

import { route } from "../../../static/router/Routes";
import { AuthProps } from "./Auth.static";
import useAuthForm from "./Auth.logic";

const AuthForm: React.FC<AuthProps> = ({ formType }) => {
  const {
    formValues,
    setFormValues,
    handleFormSubmit,
    handleChange,
  } = useAuthForm(formType);
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  
  // Focus on email input on mount
  useEffect(() => {
    emailRef.current?.focus();
  }, []);


  return (
    <>
      {formValues.success ? (
        <Success className="success">
          <h1 aria-live="assertive">
            You {formType === "login" ? "Logged in" : "Registered"} successfully
          </h1>
          <p>{formType === "register" ? "Redirecting to login page" : ""}</p>
        </Success>
      ) : (
        <StyledAuth>
          <Alert className={formValues.errMessage ? "errmsg" : "offscreen"}>
            <p ref={errRef} aria-live="assertive">
              {formValues.errMessage}
            </p>
          </Alert>
          <Form
            title={`${formType === "login" ? "Login" : "Register"} Page`}
            onSubmit={handleFormSubmit}
          >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              required
              value={formValues.email}
              onChange={handleChange}
              onFocus={() =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  emailFocus: true,
                }))
              }
              onBlur={() =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  emailFocus: false,
                }))
              }
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              required
              value={formValues.password}
              onChange={handleChange}
              onFocus={() =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  passwordFocus: true,
                }))
              }
              onBlur={() =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  passwordFocus: false,
                }))
              }
            />
            {formType === "register" && (
              <>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="off"
                  required
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  onFocus={() =>
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      confirmPasswordFocus: true,
                    }))
                  }
                  onBlur={() =>
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      confirmPasswordFocus: false,
                    }))
                  }
                />
              </>
            )}
            <Button>{formType === "login" ? "Login" : "Register"}</Button>
            <p>
              {formType === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
              <a href={formType === "login" ? route.register : route.login}>
                {formType === "login" ? "Register" : "Login"}
              </a>
            </p>
          </Form>
        </StyledAuth>
      )}
    </>
  );
};

export default AuthForm;
