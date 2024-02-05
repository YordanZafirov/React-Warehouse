import { useEffect, useState } from "react";
import { Warehouse } from "./Warehouse.static";
import { endpoint } from "../../../static/endpoints/Endpoint";

const useWarehouseForm = () => {
  const [warehouse, setWarehouse] = useState({
    name: "",
    address: "",
    type: "solid",
    errMsg: "",
    success: false,
  });

  useEffect(() => {
    setWarehouse((prevValues) => ({
      ...prevValues,
      errMsg: "",
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setWarehouse((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const clearInputs = () => {
    setWarehouse({
      name: "",
      address: "",
      type: "solid",
      errMsg: "",
      success: false,
    });
  };

  const createWarehouse = (data: Partial<Warehouse>) => {
    const token = localStorage.getItem("accessToken");

    if (!warehouse.name.trim() || !warehouse.address.trim()) {
      setWarehouse((prevValues) => ({
        ...prevValues,
        errMsg: "Name and address cannot be empty",
      }));
      return;
    }

    fetch(endpoint.warehouse, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          setWarehouse((prevValues) => ({
            ...prevValues,
            errMsg: "You are not authorized to access this page",
          }));
        } else if (res.status === 500) {
          setWarehouse((prevValues) => ({
            ...prevValues,
            errMsg: "Something went wrong. Please try again later",
          }));
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        } else {
          setWarehouse((prevValues) => ({
            ...prevValues,
            success: true,
          }));
        }
      })
      .catch((err) => {
        if (err.message === "Bad Request") {
          setWarehouse((prevValues) => ({
            ...prevValues,
            errMsg: "Warehouse with the same name and address already exists",
          }));
        }
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: warehouse.name,
      address: warehouse.address,
      type: warehouse.type,
    };

    createWarehouse(data);

    clearInputs();
  };
  return { warehouse, handleChange, handleSubmit, setWarehouse };
};

export default useWarehouseForm;
