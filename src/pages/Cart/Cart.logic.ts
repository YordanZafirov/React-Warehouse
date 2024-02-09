import { useState } from "react";
import { Order, Product } from "./Cart.static";
import { Warehouse } from "../Warehouse/WarehouseForm/Warehouse.static";
import { useCart } from "../../context/CartContext";
import { endpoint } from "../../static/endpoints/Endpoint";
import { toast } from "react-toastify";

const useCartModal = (onSubmit: () => void) => {
  const { items, clearCart } = useCart();
  // State for order details
  const [order, setOrder] = useState<Order>({
    type: "",
    clientId: "",
    warehouseId: "",
    outgoingWarehouse: "",
    product: [],
    errMsg: "",
    success: false,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredWarehouses, setFilteredWarehouses] = useState<
    Warehouse[] | undefined
  >(undefined);

  const token = localStorage.getItem("accessToken");

  // Fetch product details
  const fetchProducts = async () => {
    const productDetailsPromises = items.map(async (item) => {
      const res = await fetch(endpoint.product + "/" + item.id, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      // Create product details object
      const productDetails: Product = {
        id: item.id,
        type: data.type,
        unitType: data.unitType,
        name: data.name,
        quantity: 1,
        unitPrice: 0,
      };
      return productDetails;
    });

    const productDetails = await Promise.all(productDetailsPromises);
    setProducts(productDetails);
  };

  // Handle change in order details
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  // Handle change in product details
  const handleProductChange = (
    productId: string,
    field: string,
    value: string
  ) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            [field]:
              field === "quantity" || field === "unitPrice"
                ? parseFloat(value)
                : value,
          };
        }
        return product;
      });
      return updatedProducts;
    });
  };

  // Submit order
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { type, clientId, warehouseId, outgoingWarehouse } = order;

    // Create product details object
    const product = products.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      unitPrice: product.unitPrice,
    }));

    const requestBody = {
      type,
      clientId,
      warehouseId,
      product,
    };

    // Add outgoing warehouse if order type is transfer
    if (outgoingWarehouse) {
      Object.assign(requestBody, { outgoingWarehouse });
    }

    const body = JSON.stringify(requestBody);

    try {
      fetch(endpoint.order, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error creating order");
          }
          return res.json();
        })
        .then((data) => {
          if (data) {
            toast.success("Order created successfully");
            clearCart();
            setTimeout(() => {
              onSubmit();
            }, 2000);
          } else {
            toast.error("Error creating order");
          }
        });
    } catch (error) {
      console.error(error);
      toast.error("Error creating order");
    }
  };
  return {
    order,
    setOrder,
    products,
    filteredWarehouses,
    setFilteredWarehouses,
    fetchProducts,
    handleChange,
    handleProductChange,
    handleSubmit,
  };
};

export default useCartModal;
