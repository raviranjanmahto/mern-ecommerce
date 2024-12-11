import { createContext } from "react";
import { products } from "../assets/assets";

// Create ShopContext with default values
export const ShopContext = createContext({
  products: [],
  currency: "$",
  deliveryFee: 10,
});

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const deliveryFee = 10;
  const value = {
    products: [...products],
    currency,
    deliveryFee,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
