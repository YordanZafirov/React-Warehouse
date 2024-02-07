import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { endpoint } from "../../static/endpoints/Endpoint";

const useGetOrderDetails = () => {
  const { id } = useParams<{ id: string | undefined }>();

  const {
    data: orderDetails,
    isLoading,
    error,
    refetch,
  } = useQuery(["orderDetails", id], () => (id ? getOrderDetails(id) : null), {
    enabled: !!id,
  });

  async function getOrderDetails(id: string) {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }

      const res = await fetch(endpoint.orderDetail + "/order/" + id, {
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
    orderDetails,
    isLoading,
    error,
    refetch,
  };
};

export default useGetOrderDetails;
