import { ChangeEvent, FormEvent, useState, useRef, useEffect } from "react";
import {
  Alert,
  StyledAuth,
  Success,
} from "../../../components/alert/Alert.style";
import Form from "../../../components/form/Form";
import Button from "../../../components/button/Button";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { route } from "../../../static/router/Routes";
import { endpoint } from "../../../static/endpoints/Endpoint";

interface AuthProps {
  formType: "register" | "login";
}

const AuthForm: React.FC<AuthProps> = ({ formType }) => {
  const { login } = useAuth();
  // const {handleChange, handleFormSubmit, formValues, setFormValues} = useAuthForm(formType);
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    errMessage: "",
    success: false,
    emailFocus: false,
    passwordFocus: false,
    confirmPasswordFocus: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      errMessage: "",
    }));
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      errMessage: "",
    }));
  }, [formValues.email, formValues.password, formValues.confirmPassword]);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.email)) {
      setFormValues((prevValues) => ({
        ...prevValues,
        errMessage: "Invalid email format",
      }));
      return;
    }

    if (formValues.password.length < 5) {
      setFormValues((prevValues) => ({
        ...prevValues,
        errMessage: "Password must be at least 6 characters long",
      }));
      return;
    }

    if (
      formType === "register" &&
      formValues.password !== formValues.confirmPassword
    ) {
      setFormValues((prevValues) => ({
        ...prevValues,
        errMessage: "Passwords do not match",
      }));
      return;
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //  validateForm();

    const data = {
      email: formValues.email,
      password: formValues.password,
    };

    const url = formType === "login" ? endpoint.login : endpoint.register;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const response = await res.json();
        if (response.error) {
          setFormValues((prevValues) => ({
            ...prevValues,
            errMessage: response.error,
          }));
        }

        const accessToken = response.access_token;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }
      })
      .then(() => {
        setFormValues((prevValues) => ({
          ...prevValues,
          success: true,
        }));
        login(localStorage.getItem("accessToken") || "");

        setTimeout(() => {
          setFormValues((prevValues) => ({
            ...prevValues,
            success: false,
          }));
        }, 3000);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setFormValues((prevValues) => ({
          ...prevValues,
          errMessage: "An error occurred during the request.",
        }));
      });
  };

  return (
    <>
      {formValues.success ? (
        <Success className="success">
          <h1 aria-live="assertive">
            You {formType === "login" ? "Logged in" : "Registered"} successfully
          </h1>
          <p>
            <a href={formType === "register" ? route.login : "#"}>
              {formType === "login" ? <Navigate to={route.client} /> : "Login"}
            </a>
          </p>
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