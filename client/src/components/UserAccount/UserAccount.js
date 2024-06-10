import React, { useState } from "react";
import "./UserAccount.scss";
import HeaderPage from "../../utils/Header/Header";
import FooterPage from "../../utils/Footer/FooterPage";
import Sidebar from "./Sidebar/Sidebar";
import { thanhtoans } from "./ListProduct";

export default function UserAccount() {
  const [title, setTitle] = useState("Thanh toán");
  return (
    <div style={{ " backgroundColor": "#f5f7fd" }}>
      <HeaderPage />
      <div className="container useraccount-container">
        <div className="d-flex justify-content-around">
          <Sidebar />
          <div className="account-info col-9">
            <div className="order-list-btn">
              <ul className="nav d-flex justify-content-between">
                <li
                  className="nav-item"
                  onClick={() => {
                    setTitle("Thanh toán");
                  }}
                >
                  Thanh toán
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    setTitle("Chờ giao");
                  }}
                >
                  Chờ giao
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    setTitle("Đang giao");
                  }}
                >
                  Đang giao
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    setTitle("Đã giao");
                  }}
                >
                  Đã giao
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    setTitle("Đã hủy");
                  }}
                >
                  Đã hủy
                </li>
              </ul>
            </div>

            <div className="status-content">

              <div className={title === 'Thanh toán' ? 'thanhtoan' : 'fade'}>
                <h5 className="fw-bold">{title}</h5>
                {thanhtoans.map((thanhtoan) => {
                  return (
                    <>
                      <div className="tab-content">
                        <div key="1" className="cart-product-line d-flex ">
                          <div className="product-img">
                            <img src={thanhtoan.img} />
                          </div>
                          <div className="product-info w-100">
                            <div className="item-cart-product-name">
                              {thanhtoan.info}
                            </div>
                            <div className="d-flex w-100 align-center product-info-bottom">
                              <span style={{ width: 600 }}></span>
                              <div className="item-cart-quantity-pro">x1</div>
                              <div className="item-cart-price-pro mr-0 ">100000đ</div>
                            </div>
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
                            style={{ width: 180 }}
                          >
                            <span>Tiền tích lũy</span>
                            <span className="font-bold font-15 line-height-15 cc-pink-primary">
                              100000đ
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
                              style={{ width: 115 }}
                            >
                              Thành tiền
                            </span>
                            <span className="font-bold font-15 line-height-15 color-20">
                              790000đ
                            </span>
                          </span>
                        </span>
                      </div>
                    </>
                  )
                })}
              </div>


              <div className={title === 'Chờ giao' ? 'chờ giao' : 'fade'}>
                <div className="tab-content">
                  <h5 className="fw-bold">{title}</h5>
                  <div key="1" className="cart-product-line d-flex ">
                    <div className="product-img">
                      <img src="assest/images/product/44604-trans.png" alt="1" />
                    </div>
                    <div className="product-info w-100">
                      <div className="item-cart-product-name">
                        chờ giao
                      </div>
                      <div className="d-flex w-100 align-center product-info-bottom">
                        <span style={{ width: 600 }}></span>
                        <div className="item-cart-quantity-pro">x1</div>
                        <div className="item-cart-price-pro mr-0 ">100000đ</div>
                      </div>
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
                      style={{ width: 180 }}
                    >
                      <span>Tiền tích lũy</span>
                      <span className="font-bold font-15 line-height-15 cc-pink-primary">
                        100000đ
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
                        style={{ width: 115 }}
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

              <div className={title === 'Đang giao' ? 'chờ giao' : 'fade'}>
                <div className="tab-content">
                  <h5 className="fw-bold">{title}</h5>
                  <div key="1" className="cart-product-line d-flex ">
                    <div className="product-img">
                      <img src="assest/images/product/44604-trans.png" alt="1" />
                    </div>
                    <div className="product-info w-100">
                      <div className="item-cart-product-name">
                        đang giao
                      </div>
                      <div className="d-flex w-100 align-center product-info-bottom">
                        <span style={{ width: 600 }}></span>
                        <div className="item-cart-quantity-pro">x1</div>
                        <div className="item-cart-price-pro mr-0 ">100000đ</div>
                      </div>
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
                      style={{ width: 180 }}
                    >
                      <span>Tiền tích lũy</span>
                      <span className="font-bold font-15 line-height-15 cc-pink-primary">
                        100000đ
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
                        style={{ width: 115 }}
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

              <div className={title === 'Đã giao' ? 'chờ giao' : 'fade'}>
                <div className="tab-content">
                  <h5 className="fw-bold">{title}</h5>
                  <div key="1" className="cart-product-line d-flex ">
                    <div className="product-img">
                      <img src="assest/images/product/44604-trans.png" alt="1" />
                    </div>
                    <div className="product-info w-100">
                      <div className="item-cart-product-name">
                        đã giao
                      </div>
                      <div className="d-flex w-100 align-center product-info-bottom">
                        <span style={{ width: 600 }}></span>
                        <div className="item-cart-quantity-pro">x1</div>
                        <div className="item-cart-price-pro mr-0 ">100000đ</div>
                      </div>
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
                      style={{ width: 180 }}
                    >
                      <span>Tiền tích lũy</span>
                      <span className="font-bold font-15 line-height-15 cc-pink-primary">
                        100000đ
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
                        style={{ width: 115 }}
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

              <div className={title === 'Đã hủy' ? 'chờ giao' : 'fade'}>
                <div className="tab-content">
                  <h5 className="fw-bold">{title}</h5>
                  <div key="1" className="cart-product-line d-flex ">
                    <div className="product-img">
                      <img src="assest/images/product/44604-trans.png" alt="1" />
                    </div>
                    <div className="product-info w-100">
                      <div className="item-cart-product-name">
                        đã hủy
                      </div>
                      <div className="d-flex w-100 align-center product-info-bottom">
                        <span style={{ width: 600 }}></span>
                        <div className="item-cart-quantity-pro">x1</div>
                        <div className="item-cart-price-pro mr-0 ">100000đ</div>
                      </div>
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
                      style={{ width: 180 }}
                    >
                      <span>Tiền tích lũy</span>
                      <span className="font-bold font-15 line-height-15 cc-pink-primary">
                        100000đ
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
                        style={{ width: 115 }}
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
        </div>
      </div>

      <FooterPage />
    </div>
  );
}
