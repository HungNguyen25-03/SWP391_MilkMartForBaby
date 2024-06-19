import React, { useEffect, useState } from "react";
import { ListOfProduct } from "../../Cart/ListOfProduct";

const CartSummary = () => {
  const [temporary, setTemporary] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    ListOfProduct.map((product) => {
      setTemporary(temporary + product.price * product.quantity);
    });
  }, []);

  return (
    <div className="cart-summary">
      <div className="summary-item">
        Tạm tính: <span>2.123.000₫</span>
      </div>
      <div className="summary-item">
        Giảm giá sản phẩm: <span>-461.400₫</span>
      </div>
      <div className="summary-item">
        Phí vận chuyển: <span>+23.600₫</span>
      </div>
      <div className="summary-item">
        Tổng tiền: <span>1.684.600₫ (Đã bao gồm VAT)</span>
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
