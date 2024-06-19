import { createContext, useState } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [orderInfomation, setOrderInfomation] = useState({});

  return (
    <CartContext.Provider value={{ orderInfomation, setOrderInfomation }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
