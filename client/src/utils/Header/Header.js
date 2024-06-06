import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import "./Header.scss";

export default function HeaderPage() {
  return (
    <div className=" search-bar">
      <div className="container d-flex align-center justify-content-between">
        <div className="d-flex align-center">
          <div className="logo">
            <img src="assest/images/logo/logo.png" />
          </div>
          <div className="search ">
            <form className="d-flex">
              <input type="text" placeholder="Hôm nay bạn muốn mua gì?" />
              <button type="submit" className="btn" name="submit-search">
                Tìm kiếm
              </button>
            </form>
          </div>
        </div>

        <div className="other_header d-flex align-center justify-content-space">
          <Link to="/cart" className="cart">
            <div className="cart_icon">
              <FaShoppingCart />
            </div>
            <div className="detail">Giỏ hàng</div>
          </Link>
          <Link to="/acccount" className="acc">
            <div className="acc_icon">
              <FaUser />
            </div>
            <div className="detail">Tài khoản</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
