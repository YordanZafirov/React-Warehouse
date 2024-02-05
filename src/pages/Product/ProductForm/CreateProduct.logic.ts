import { useEffect, useState } from "react";
import { endpoint } from "../../../static/endpoints/Endpoint";
import { useNavigate } from "react-router-dom";

const useProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    unitType: "kg",
    type: "solid",
    errMsg: "",
    success: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setProduct((prevValues) => ({
      ...prevValues,
      errMsg: "",
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const clearInputs = () => {
    setProduct({
      name: "",
      unitType: "kg",
      type: "solid",
      errMsg: "",
      success: false,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    if (!product.name.trim()) {
      setProduct((prevValues) => ({
        ...prevValues,
        errMsg: "Product name cannot be empty",
      }));
      return;
    }

    const data = {
      name: product.name,
      unitType: product.unitType,
      type: product.type,
    };

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
            navigate("/product");
          }, 3000);
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
