import React from "react";
import "./UserAccount.scss";
import HeaderPage from "../../utils/Header/Header";
import FooterPage from "../../utils/Footer/FooterPage";
import { MdDelete } from "react-icons/md";

export default function UserAccount() {
  return (
    <div style={{ "background-color": "#f5f7fd" }}>
      <HeaderPage />
      <div className="container useraccount-container">
        <div className="d-flex">
          <div className="sidebar col-3">
            <div className="box-block"></div>
            <div>
              <div>Thẻ thành viên</div>
              <div>Tiền tích lũy</div>
            </div>
          </div>
          <div className="account-info col-9">
            <div className="order-list-btn">
              <ul className="nav d-flex justify-content-between">
                <li className="nav-item">Thanh toán</li>
                <li className="nav-item">Chờ giao</li>
                <li className="nav-item">Đang giao</li>
                <li className="nav-item">Đã giao</li>
                <li className="nav-item">Đã hủy</li>
              </ul>
            </div>
            <div className="tab-content">
              <h5 className="fw-bold">Đã hủy</h5>
              <div key="1" className="cart-product-line">
                <div className="block-cart-first">
                  <div className="product-img">
                    <img src="assest/images/product/44604-trans.png" alt="1" />
                  </div>
                  <div className="item-cart-product-name">
                    Sữa Enfamil A2 NeuroPro số 2 800g Follow Up Formula, 6 - 12
                    tháng tuổi{" "}
                  </div>
                </div>
                <div className="block-cart-end d-flex justify-content-end align-items-end">
                  <div className="item-cart-quantity-pro">x1</div>
                  <div className="item-cart-price-pro mr-0 ">100000đ</div>
                </div>
              </div>
            </div>
            <div className="px-20 container font-13 mt-20 color-20 pb-20 line-height-13 border-top-f2 block-end">
              <span className="d-flex w-100  align-center justify-content-between">
                <span className="w-50">
                  <span className="color-20">Có</span>
                  <span className="font-bold font-15 line-height-15 color-20">
                    1 sản phẩm
                  </span>
                </span>
                <span
                  className=" d-flex justify-content-between align-items-end"
                  style={{ width: 170 }}
                >
                  <span>Tiền tích lũy</span>
                  <span className="font-bold font-15 line-height-15 cc-pink-primary">
                    0đ
                  </span>
                </span>
              </span>
              <span className="d-flex align-center align-items-end w-100 justify-content-between">
                <span className="w-50 align-items-end d-flex">
                  <span>Mã đơn </span>
                  <span className="font-bold font-15 d-inline-flex align-items-end color-20">
                    #123123
                  </span>
                </span>
                <span className=" d-flex  align-items-end  justify-content position-relative color-20 font-13">
                  <span
                    className=" d-flex  align-items-end  justify-content position-relative color-20 font-13"
                    style={{ width: 170 }}
                  >
                    Thành tiền
                  </span>
                  <span className="font-bold font-15 line-height-15 color-20">
                    790000đ
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
}
