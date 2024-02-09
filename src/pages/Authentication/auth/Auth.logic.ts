import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { route } from "../../../static/router/Routes";
import { endpoint } from "../../../static/endpoints/Endpoint";

const useAuthForm = (formType: "register" | "login") => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // State for form values
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

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      errMessage: "",
    }));
  };

  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      errMessage: "",
    }));
  }, [formValues.email, formValues.password, formValues.confirmPassword]);

  // Validate form
  const validateForm = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formValues.email)) {
      setFormValues((prevValues) => ({
        ...prevValues,
        errMessage: "Invalid email",
      }));
      return false;
    } else if (formValues.password.length < 5) {
      setFormValues((prevValues) => ({
        ...prevValues,
        errMessage: "Password must be at least 6 characters long",
      }));
      return false;
    } else if (
      formType === "register" &&
      formValues.password !== formValues.confirmPassword
    ) {
      setFormValues((prevValues) => ({
        ...prevValues,
        errMessage: "Passwords do not match",
      }));
      return false;
    } else {
      return true;
    }
  };

  // Handle form submit
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = {
      email: formValues.email,
      password: formValues.password,
    };

    const url = formType === "login" ? endpoint.login : endpoint.register;

    // Send request to server for login or register
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (!res.ok) {
          setFormValues((prevValues) => ({
            ...prevValues,
            errMessage: "Invalid credentials. Please try again.",
          }));
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

        setTimeout(() => {
          setFormValues((prevValues) => ({
            ...prevValues,
            success: false,
          }));

          navigate(formType === "register" ? route.login : route.client);
        }, 3000);

        login(localStorage.getItem("accessToken") || "");
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setFormValues((prevValues) => ({
          ...prevValues,
          errMessage: "An error occurred during the request.",
        }));
      });
  };

  return {
    formValues,
    setFormValues,
    handleChange,
    handleFormSubmit,
  };
};

export default useAuthForm;
