import { Product } from "../../pages/Product/ListProduct/Product.static";
import { endpoint } from "../../static/endpoints/Endpoint";
import { useQuery } from "react-query";

const useGetProduct = () => {
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery("products", getProduct);

  async function getProduct() {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }
      const res = await fetch(endpoint.product, {
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

      if (!Array.isArray(data)) {
        throw new Error(`Unexpected data format: ${JSON.stringify(data)}`);
      }

      return data.map((product: Product) => ({
        ...product,
        createdAt: new Date(product.createdAt),
        updatedAt: new Date(product.updatedAt),
      }));
    } catch (error) {
      console.error(error);
    }
  }

  return {
    products,
    isLoading,
    error,
    refetch,
  };
};

export default useGetProduct;
