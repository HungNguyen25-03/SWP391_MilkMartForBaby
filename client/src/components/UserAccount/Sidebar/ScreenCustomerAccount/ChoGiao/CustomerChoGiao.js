import React, { useEffect, useState } from "react";
import axios from "axios";
import { MainAPI } from "../../../../API";
import { formatVND } from "../../../../../utils/Format";
import useAuth from "../../../../../hooks/useAuth";

export default function CustomerChoGiao({ title }) {
  const [pendingOrderList, setPendingOrderList] = useState([]);
  const [showTrack, setShowTrack] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    axios
      .post(`${MainAPI}/order/get-order-by-user-id-confirm-status`, {
        user_id: auth.user.user_id,
      })
      .then((res) => {
        // console.log(res.data);
        setPendingOrderList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handTrackOrder = (index) => {
    console.log(index);
    setShowTrack(showTrack === index ? null : index);
  };

  return (
    <div className={title === "Chờ giao" ? "chogiao" : "fade"}>
      <h5 className="fw-bold">{title}</h5>
      {pendingOrderList.length === 0 ? (
        <div className="emptyinfo">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Faccount%2Fchogiao.png?alt=media&token=8580382f-7bc6-477f-a95e-38b3a06eb189"
            }
          />
          <p>
            Hiện chưa có đơn hàng nào <br />
            đang chờ được giao
          </p>
        </div>
      ) : (
        pendingOrderList.map((product, index) => {
          return (
            <div className="eachchogiao" key={product.product_id}>
              <div style={{ textAlign: "right" }}>
                <button
                  style={{
                    border: "none",
                    backgroundColor: "#00CCFF",
                    borderRadius: "10px",
                    color: "white",
                    padding: "10px",
                  }}
                  onClick={() => handTrackOrder(index)}
                >
                  Order Progress
                </button>
              </div>
              <div>
                {showTrack === index && (
                  <>
                    <div style={{ display: "flex" }}>
                      <span
                        style={{
                          border: "1px solid #67b14e",
                          borderRadius: "10px",
                          backgroundColor: "#67b14e",
                          padding: "3px",
                          color: "white",
                        }}
                      >
                        Chờ thanh toán
                      </span>
                      &nbsp;&nbsp;
                      <span>------&#62;</span>&nbsp;&nbsp;
                      <span
                        style={{
                          border: "1px solid #67b14e",
                          borderRadius: "10px",
                          backgroundColor: "#67b14e",
                          padding: "3px",
                          color: "white",
                        }}
                      >
                        Thanh Toán
                      </span>
                      &nbsp;&nbsp;
                      <span>------&#62;</span>&nbsp;&nbsp;
                      <span
                        style={{
                          border: "1px solid #67b14e",
                          borderRadius: "10px",
                          backgroundColor: "#67b14e",
                          padding: "3px",
                          color: "white",
                        }}
                      >
                        Chờ giao
                      </span>
                      &nbsp;&nbsp;
                      <span>------&#62;</span>&nbsp;&nbsp;
                      <span>Đang giao</span>&nbsp;&nbsp;
                      <span>------&#62;</span>&nbsp;&nbsp;
                      <span>Đã giao</span>&nbsp;&nbsp;
                      <span>------&#62;</span>&nbsp;&nbsp;
                      <span>Đã Hủy</span>
                    </div>
                  </>
                )}
              </div>
              <div className="tab-content">
                <div key="1" className="cart-product-line d-flex ">
                  <div className="product-img">
                    <img src={product.img} alt="1" />
                  </div>
                  <div className="product-info w-100">
                    <div className="item-cart-product-name">{product.info}</div>
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
                      {formatVND(product.total_amount)}
                    </span>
                  </span>
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
