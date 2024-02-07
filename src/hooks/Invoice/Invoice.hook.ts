import { useQuery } from "react-query";
import { endpoint } from "../../static/endpoints/Endpoint";
import { useParams } from "react-router-dom";

const useGetInvoice = () => {
  const { id } = useParams<{ id: string | undefined }>();

  const {
    data: invoice,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ["invoice", id],
    () => (id ? getInvoiceByOrderId(id) : null),
    {
      enabled: !!id,
    }
  );

  async function getInvoiceByOrderId(id: string) {
    
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }
      
      const res = await fetch(endpoint.invoice + "/order/" + id, {
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
  }
  return {
    invoice,
    isLoading,
    error,
    refetch,
  };
};

export default useGetInvoice;
