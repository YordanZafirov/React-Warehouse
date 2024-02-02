import { Product } from "../../pages/Product/Product.static";
import { endpoint } from "../../static/endpoints/Endpoint";
import { useMutation, useQuery } from "react-query";

const useProduct = () => {
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery("products", getProduct);

  const deleteProductMutation = useMutation(deleteProduct);

  async function getProduct() {
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
  }

  async function deleteProduct(id: string) {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Access token not found");
    }

    const res = await fetch(`${endpoint.product}/soft-delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to delete product: ${res.statusText}`);
    }

    refetch();
  }
  return { products, isLoading, error, deleteProduct: deleteProductMutation.mutate};
};

export default useProduct;
