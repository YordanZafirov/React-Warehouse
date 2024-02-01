import { useState } from "react";
import { Product } from "../../pages/Product/Product.static";
import { token } from "../../static/token";
import { endpoint } from "../../static/endpoints/Endpoint";

const useProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProduct = () => {
    fetch(endpoint.product, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(() =>
          data.map((product) => ({
            ...product,
            createdAt: new Date(product.createdAt).toLocaleString(),
            updatedAt: new Date(product.updatedAt).toLocaleString(),
          }))
        );
      });
  };
  const handleDelete = (id: string) => {
    fetch(endpoint.product + "/soft-delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to delete product. Status: ${res.status}`);
      }
      return res.json();
    })
    .then(() => {
      setProducts((prevProduct) =>
        prevProduct.filter((product) => product.id !== id)
      );
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
    });
  };
  return { products, getProduct, handleDelete };
};

export default useProduct;
