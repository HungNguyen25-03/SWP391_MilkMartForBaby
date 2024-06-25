import React, { useEffect, useState } from "react";
import { dagiaos } from "../ListProduct";
import axios from "axios";
import { MainAPI } from "../../../../API";
import { formatVND } from "../../../../../utils/Format";
import ModalReview from "../ModalReview/ModalReview";
import useAuth from "../../../../../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CompletedOrder.scss";

export default function CustomerDaGiao({ title }) {
  const [completeOrderList, setCompleteOrderList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const { auth } = useAuth();

  console.log(auth.user.user_id);
  useEffect(() => {
    axios
      .post(`${MainAPI}/order/get-order-by-user-id`, {
        user_id: auth.user.user_id,
      })
      .then((res) => {
        console.log(res.data);
        setCompleteOrderList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (feedback) => {
    console.log(feedback);
  };

  return (
    <div className={title === "Đã giao" ? "chờ giao" : "fade"}>
      <ToastContainer />
      <h5 className="fw-bold">{title}</h5>
      {completeOrderList.length === 0 ? (
        <div className="emptyinfo">
          <img src="https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Faccount%2Fdanggiao.png?alt=media&token=c31a1c88-3ed9-4d03-b8d5-daabd9cf7992" />
          <p>
            Hiện chưa có sản phẩm <br />
            nào đã giao
          </p>
        </div>
      ) : (
        completeOrderList.map((dagiao) => {
          return (
            <>
              <div className="order">
                {dagiao.products.map((product, index) => {
                  return (
                    <>
                      <div className="tab-content">
                        <div key={index} className="cart-product-line d-flex ">
                          <div className="product-img">
                            <img src={product.image_url} alt="1" />
                          </div>
                          <div className="product-info w-100">
                            <div className="item-cart-product-name">
                              {product.product_name}
                            </div>
                            <div className="d-flex w-100 align-center product-info-bottom">
                              <span style={{ width: 600 }}></span>
                              <div className="item-cart-quantity-pro">
                                x{product.quantity}
                              </div>
                              <div className="item-cart-price-pro mr-0 ">
                                {formatVND(product.price)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end mt-3">
                        <button
                          className="btn btn-warning m-0"
                          onClick={() => {
                            setModalOpen(true);
                            setProductDetail(product);
                          }}
                        >
                          Đánh giá
                        </button>
                        {modalOpen && (
                          <ModalReview
                            product={productDetail}
                            closeModal={() => {
                              setModalOpen(false);
                            }}
                            onSubmit={handleSubmit}
                          />
                        )}
                      </div>
                    </>
                  );
                })}
                <div className="px-20 container font-13 mt-20 color-20 pb-20 line-height-13 border-top-f2 block-end">
                  <span className="d-flex w-100  align-center justify-content-between">
                    <span className="w-50">
                      <span className="color-20">Có </span>
                      <span className="font-bold font-15 line-height-15 color-20">
                        {dagiao.products.length} sản phẩm
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
                        #{dagiao.order_id}
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
                        {formatVND(dagiao.total_amount)}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </>
          );
        })
      )}
    </div>
  );
}
