import { useEffect, useState } from "react";
import { endpoint } from "../../../static/endpoints/Endpoint";

const useProductForm = () => {
  // The state is initialized with an empty string for all fields
  const [product, setProduct] = useState({
    name: "",
    unitType: "kg",
    type: "solid",
    errMsg: "",
    success: false,
  });

  // The useEffect hook is used to clear the error message when the component is mounted
  useEffect(() => {
    setProduct((prevValues) => ({
      ...prevValues,
      errMsg: "",
    }));
  }, []);

  // The handleChange function is used to update the state when the input fields change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // The clearInputs function is used to clear the input fields after the form is submitted
  const clearInputs = () => {
    setProduct({
      name: "",
      unitType: "kg",
      type: "solid",
      errMsg: "",
      success: false,
    });
  };

  // The handleSubmit function is used to submit the form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    // The validateForm function is used to validate the input fields
    if (!product.name.trim()) {
      setProduct((prevValues) => ({
        ...prevValues,
        errMsg: "Product name cannot be empty",
      }));
      return;
    }

    // The data object is used to store the input fields
    const data = {
      name: product.name,
      unitType: product.unitType,
      type: product.type,
    };

    // The fetch function is used to make a POST request to the server
    fetch(endpoint.product, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 401) {
          setProduct((prevValues) => ({
            ...prevValues,
            errMsg: "You are not authorized to perform this action",
          }));
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setProduct((prevValues) => ({
            ...prevValues,
            errMsg: "Invalid unit type for the specified product type",
          }));
        } else {
          setProduct((prevValues) => ({
            ...prevValues,
            success: true,
          }));

          setTimeout(() => {
            setProduct((prevValues) => ({
              ...prevValues,
              success: false,
            }));
          }, 2000);
        }
      })
      .catch((err) => {
        setProduct((prevValues) => ({
          ...prevValues,
          errMsg: err.message,
        }));
      });

    clearInputs();
  };
  return { product, handleChange, handleSubmit };
};

export default useProductForm;
