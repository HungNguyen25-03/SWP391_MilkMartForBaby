import React, { useState } from "react";
import { FaLongArrowAltLeft, FaRegPlusSquare } from "react-icons/fa";
import { FaRegSquareMinus } from "react-icons/fa6";
import "./Cart.scss";
import { ListOfProduct } from "./ListOfProduct";

export default function Cart() {
  const [quanity, setQuantity] = useState(0);

  const handleClick = (e) => {};
  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <button>
        {" "}
        <FaLongArrowAltLeft /> Continue shopping
      </button>
      <div className="order-product-list">
        <div className="item-cart-product-line">
          <div className="item-cart-price">Đơn giá</div>
          <div className="item-cart-quantity">Số lượng</div>
          <div className="item-cart-total">Thành tiền</div>
        </div>
        {ListOfProduct.map((product) => (
          <div key={product.id} className="cart-product-line">
            <div className="block-cart-first">
              <div className="product-img">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="item-cart-product-name">{product.name}</div>
            </div>
            <div className="block-cart-end">
              <div className="item-cart-price">{product.price}</div>
              <div className="item-cart-quantity">
                <button>
                  <FaRegSquareMinus />
                </button>
                {product.quantity}
                <button>
                  <FaRegPlusSquare />
                </button>
              </div>
              <div className="item-cart-total">
                {product.price * product.quantity}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
