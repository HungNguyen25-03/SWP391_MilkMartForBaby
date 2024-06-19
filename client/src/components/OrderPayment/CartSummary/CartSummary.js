import React, { useEffect, useState } from "react";
import { ListOfProduct } from "../../Cart/ListOfProduct";
import useCart from "../../../hooks/useCart";

const CartSummary = () => {
  const [temporary, setTemporary] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const { orderInfomation } = useCart();

  useEffect(() => {
    setTemporary(
      ListOfProduct.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
    );
    setDiscount(temporary * parseFloat(orderInfomation.discount / 100));
    setTotal(temporary - discount);
  }, []);

  console.log(temporary);
  console.log(~~discount);
  console.log(total);
  return (
    <div className="cart-summary">
      <div className="summary-item">
        Tạm tính: <span>{temporary}₫</span>
      </div>
      <div className="summary-item">
        Giảm giá sản phẩm: <span>-{discount}₫</span>
      </div>
      <div className="summary-item">
        Phí vận chuyển: <span>+0₫</span>
      </div>
      <div className="summary-item">
        Tổng tiền: <span>{total}₫ (Đã bao gồm VAT)</span>
      </div>
      <button
        className="btn"
        style={{ background: "#FF199B", margin: 0, color: "white" }}
      >
        Đặt Hàng
      </button>
    </div>
  );
};

export default CartSummary;
