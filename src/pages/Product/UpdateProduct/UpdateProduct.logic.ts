import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { endpoint } from "../../../static/endpoints/Endpoint";

const useUpdateProduct = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    success: false,
    errMsg: "",
  });

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useQuery(["product", id], () => (id ? getProductId(id) : null), {
    enabled: !!id, // Only enable the query if id is truthy
  });

  // The updateProductMutation is used to update a product
  const updateProductMutation = useMutation(
    (updatedProduct: {}) =>
      id ? updateProduct(id, updatedProduct) : Promise.resolve(null),
    {
      onSuccess: () => {
        if (id) {
          queryClient.invalidateQueries(["product", id]);
        }
      },
    }
  );

  // The getProductId function is used to fetch a product by its id
  const getProductId = async (id: string) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }
      const res = await fetch(endpoint.product + "/" + id, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }

      const data = await res.json();

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // The updateProduct function is used to update a product
  const updateProduct = async (id: string, updatedProduct: {}) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }
      const res = await fetch(endpoint.product + "/" + id, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProduct),
      });
      if (!res.ok) {
        setAlert(() => ({
          success: false,
          errMsg: "Invalid unit to product type",
        }));
        throw new Error(`Failed to update product: ${res.statusText}`);
      }
      const data = await res.json();
      setAlert((prevState) => ({
        ...prevState,
        success: true,
      }));

      setTimeout(() => {
        setAlert((prevState) => ({
          ...prevState,
          success: false,
        }));

        navigate("/product");
      }, 3000);

      return data;
    } catch (error) {
      setAlert({ success: false, errMsg: "Invalid unit to product type" });
    }
  };

  return {
    alert,
    setAlert,
    product,
    isLoading,
    error,
    refetch,
    updateProduct: updateProductMutation.mutate,
  };
};

export default useUpdateProduct;
