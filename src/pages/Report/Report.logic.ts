import { useQuery } from "react-query";
import { endpoint } from "../../static/endpoints/Endpoint";

const useReports = () => {
  const {
    data: bestSellingProduct,
    isLoading: isLoadingBestSellingProducts,
    error: errorBestSellingProducts,
    refetch: refetchBestSellingProducts,
  } = useQuery("bestSellingProduct", getBestSellingProducts);

  const {
    data: clientWithMostOrders,
    isLoading: isLoadingClientWithMostOrders,
    error: errorClientWithMostOrders,
    refetch: refetchClientWithMostOrders,
  } = useQuery("clientWithMostOrders", getClientWithMostOrders);

  const {
    data: highestStockPerWarehouse,
    isLoading: isLoadingHighestStockPerWarehouse,
    error: errorHighestStockPerWarehouse,
    refetch: refetchHighestStockPerWarehouse,
  } = useQuery("highestStockPerWarehouse", getHighestStockPerWarehouse);

  const isLoading =
    isLoadingBestSellingProducts ||
    isLoadingClientWithMostOrders ||
    isLoadingHighestStockPerWarehouse;

  async function getBestSellingProducts() {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }

      const res = await fetch(endpoint.report + "/best-selling-products", {
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
    }
  }

  async function getClientWithMostOrders() {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }

      const res = await fetch(endpoint.report + "/client-with-most-orders", {
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
    }
  }

  async function getHighestStockPerWarehouse() {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Access token not found");
      }

      const res = await fetch(
        endpoint.report + "/highest-stock-per-warehouse",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }

      const data = await res.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    bestSellingProduct,
    clientWithMostOrders,
    highestStockPerWarehouse,
    isLoading,
    error:
      errorBestSellingProducts ||
      errorClientWithMostOrders ||
      errorHighestStockPerWarehouse,
    refetchBestSellingProducts,
    refetchClientWithMostOrders,
    refetchHighestStockPerWarehouse,
  };
};

export default useReports;
