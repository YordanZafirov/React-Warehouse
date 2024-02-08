import { useMutation } from "react-query";
import { endpoint } from "../../../static/endpoints/Endpoint";
import useProduct from "../../../hooks/Product/Product.hook";
import { toast } from "react-toastify";

const useDeleteProduct = () => {
  const { refetch } = useProduct();
  const deleteProductMutation = useMutation(deleteProduct);
  const permanentDeleteProductMutation = useMutation(permanentDeleteProduct);

  // The deleteProduct function is used to soft delete a product
  async function deleteProduct(id: string) {
    try {
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

      toast.success("Product deleted successfully");
      refetch();
    } catch (error) {
      console.error(error);
    }
  }

  // The permanentDeleteProduct function is used to permanently delete a product
  async function permanentDeleteProduct(id: string) {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }

      const res = await fetch(`${endpoint.product}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete product: ${res.statusText}`);
      }

      toast.success("Product deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete product. Product is associated with an invoice");
      console.error(error);
    }
  }
  return {
    deleteProduct: deleteProductMutation.mutate,
    permanentDeleteProduct: permanentDeleteProductMutation.mutate,
  };
};

export default useDeleteProduct;
