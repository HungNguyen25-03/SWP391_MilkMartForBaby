import { createContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartList, setCartList] = useState([]);

  const handleAddToCart = (product) => {
    const checkExist = cartList.find(
      (item) => item.product_id === product.product_id
    );
    if (checkExist) {
      const updatedCart = cartList.map((item) =>
        item.product_id === product.product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartList(updatedCart);
    } else {
      setCartList([...cartList, { ...product, quantity: 1 }]);
    }
  };

  const handleDeleteCart = (product) => {
    const updatedCart = cartList.filter(
      (item) => item.product_id !== product.product_id
    );
    setCartList(updatedCart);
  };


  return (
    <CartContext.Provider
      value={{ cartList, handleAddToCart, handleDeleteCart }}
    >
      {children}
    </CartContext.Provider>
  );
    const incrementQuantity = (product) => {
        setCartList(
            cartList.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQuantity = (product) => {
        setCartList(
            cartList.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartList, handleAddToCart, handleDeleteCart, decrementQuantity, incrementQuantity }}>
            {children}
        </CartContext.Provider>
    )

}

export { CartContext, CartProvider };
