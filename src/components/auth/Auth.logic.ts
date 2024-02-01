import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { AuthProps } from "./Auth.static";
import { endpoint } from "../../static/endpoints/Endpoint";


const useAuthForm = ({ formType }: AuthProps) => {
  const { login } = useAuth();

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
    setFormValues((prevValues) => ({
      ...prevValues,
      errMessage: "",
    }));
  }, [formValues.email, formValues.password, formValues.confirmPassword]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form values or perform any additional checks before submitting
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
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setFormValues((prevValues) => ({
          ...prevValues,
          errMessage: "An error occurred during the request.",
        }));
      });
  };

  return { handleChange, handleFormSubmit, formValues, setFormValues};
};

export default useAuthForm;
