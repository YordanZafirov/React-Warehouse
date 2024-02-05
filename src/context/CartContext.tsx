import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface CartContextType {
  items: CartItem[];
  addItem: (id: string, itemType: "solid" | "liquid") => void;
  updateItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

interface CartItem {
  id: string;
  type: "solid" | "liquid";
  quantity: number;
}

const CART_STORAGE_KEY = "cartItems";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: any) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart items from localStorage on component mount
    const storedItems = sessionStorage.getItem(CART_STORAGE_KEY);
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    // Save cart items to localStorage whenever items change
    if (items.length > 0) {
      sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const addItem = (id: string, itemType: "solid" | "liquid") => {
    setItems((prevItems) => {
      // Check if there are existing items in the cart
      if (prevItems.length > 0) {
        // Check the type of the first item in the cart
        const firstItemType = prevItems[0].type;

        // If the types match, allow adding the item
        if (firstItemType === itemType) {
          const cartItem = prevItems.find((item) => item.id === id);

          if (cartItem) {
            // Item is already in the cart, update quantity
            toast.info("Item already in the cart");
            return prevItems.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            );
          } else {
            // Item is not in the cart, add it
            toast.success("Item added to the cart");
            return [...prevItems, { id, type: itemType, quantity: 1 }];
          }
        } else {
          // Types do not match, throw an error
          console.error("Cannot add item of a different type to the cart");
          toast.error("Cannot add item of a different type to the cart");
          return prevItems;
        }
      } else {
        // Cart is empty, add the item
        toast.success("Item added to the cart");
        return [{ id, type: itemType, quantity: 1 }];
      }
    });
  };

  const updateItem = (id: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      return updatedItems;
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => {
      // Filter out the item with the specified id
      const updatedItems = prevItems.filter((item) => item.id !== id);

      return updatedItems;
    });
  };

  const clearCart = () => {
    setItems([]);

    sessionStorage.removeItem(CART_STORAGE_KEY);
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, updateItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
