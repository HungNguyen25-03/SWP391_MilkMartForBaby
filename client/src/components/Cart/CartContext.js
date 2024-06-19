import { createContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
    const [cartList, setCartList] = useState([]);

    const handleAddToCart = (product) => {
        const checkExist = cartList.find((item) => item.id === product.id);
        if (checkExist) {
            const updatedCart = cartList.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartList(updatedCart);
        } else {
            setCartList([...cartList, { ...product, quantity: 1 }]);
        }
    };

    return (
        <CartContext.Provider value={{ cartList, handleAddToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }