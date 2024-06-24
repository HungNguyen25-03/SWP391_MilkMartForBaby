import React, { useEffect, useState } from "react";
import { dagiaos } from "../ListProduct";
import axios from "axios";
import { MainAPI } from "../../../../API";
import { formatVND } from "../../../../../utils/Format";
import ModalReview from "../ModalReview/ModalReview";
import useAuth from "../../../../../hooks/useAuth";
import { ToastContainer } from "react-toastify";

export default function CustomerDaGiao({ title }) {
  const [completeOrderList, setCompleteOrderList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
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
              <div className="tab-content">
                <div key="1" className="cart-product-line d-flex ">
                  <div className="product-img">
                    <img src="assest/images/product/44604-trans.png" alt="1" />
                  </div>
                  <div className="product-info w-100">
                    <div className="item-cart-product-name">
                      {dagiao.product_name}
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
                      {formatVND(dagiao.total_amount)}
                    </span>
                  </span>
                </span>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button
                  className="btn btn-warning m-0"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  Đánh giá
                </button>
                {modalOpen && (
                  <ModalReview
                    product_id={dagiao.product_id}
                    closeModal={() => {
                      setModalOpen(false);
                    }}
                    onSubmit={handleSubmit}
                  />
                )}
              </div>
            </>
          );
        })
      )}
    </div>
  );
}
