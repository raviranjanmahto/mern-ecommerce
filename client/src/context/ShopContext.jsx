import { createContext, useState } from "react";

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
  const [search, setSearch] = useState();
  const [showSearch, setShowSearch] = useState(false);

  const value = {
    products: [...products],
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
