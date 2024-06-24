import { createContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartList, setCartList] = useState([]);
  const { auth } = useAuth();
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const localCartList = JSON.parse(localStorage.getItem("cartList"));
  // console.log(token);
  // console.log(localCartList);

  const handleAddToCart = (product) => {
    if (token) {
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
        localStorage.setItem("cartList", JSON.stringify(updatedCart));
      } else {
        setCartList([...cartList, { ...product, quantity: 1 }]);
        localStorage.setItem(
          "cartList",
          JSON.stringify([...cartList, { ...product, quantity: 1 }])
        );
      }
      toast.success("Thêm sản phẩm thành công");
    } else {
      toast.error("Hãy đăng nhập để thêm sản phẩm vào giỏ hàng");
    }
  };

  const handleDeleteCart = (product) => {
    const updatedCart = cartList.filter(
      (item) => item.product_id !== product.product_id
    );
    setCartList(updatedCart);
    localStorage.setItem("cartList", JSON.stringify(updatedCart));
  };

  const incrementQuantity = (product) => {
    setCartList(
      cartList.map((item) =>
        item.product_id === product.product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    localStorage.setItem(
      "cartList",
      JSON.stringify(
        cartList.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    );
  };

  const decrementQuantity = (product) => {
    setCartList(
      cartList.map((item) =>
        item.product_id === product.product_id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
    localStorage.setItem(
      "cartList",
      JSON.stringify(
        cartList.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        localCartList,
        handleAddToCart,
        handleDeleteCart,
        decrementQuantity,
        incrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
