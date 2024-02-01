import { useEffect, useState } from "react";
import { endpoint } from "../../static/endpoints/Endpoint";
import { token } from "../../static/token";

const useClientForm = () => {
  const [client, setClient] = useState({
    accountablePerson: "",
    userName: "",
    email: "",
    address: "",
    errMsg: "",
    success: false,
  });

  useEffect(() => {
    setClient((prevValues) => ({
      ...prevValues,
      errMsg: "",
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const clearInputs = () => {
    setClient({
      accountablePerson: "",
      userName: "",
      email: "",
      address: "",
      errMsg: "",
      success: false,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      accountablePerson: client.accountablePerson,
      userName: client.userName,
      email: client.email,
      address: client.address,
    };

    fetch(endpoint.client, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (res.status === 403) {
          return res.json();
        }
        if (res.ok) {
          clearInputs();
        }
        return res.json();
      })
      .then((data) => {

        if (data && data.error) {
          // Handle 403 Forbidden error with specific error message
          setClient((prevValues) => ({
            ...prevValues,
            errMsg:
              data.message === "Forbidden resource"
                ? "You are not authorized to perform this action"
                : data.message,
          }));
        } else {
          setClient((prevValues) => ({
            ...prevValues,
            success: true,
          }));
        }
      })
      .catch(() => {
        // Handle general errors
        setClient((prevValues) => ({
          ...prevValues,
          errMsg: "Something went wrong",
        }));
      });
  };
  return ( 
    { client, handleChange, handleSubmit }
   );
}
 
export default useClientForm;