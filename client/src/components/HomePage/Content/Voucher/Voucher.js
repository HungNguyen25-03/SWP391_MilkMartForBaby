import React, { useEffect, useState } from "react";
import "./Voucher.scss";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import axios from "axios";
import { MainAPI } from "../../../API";

export default function Voucher() {
  const [voucherList, setVoucherList] = useState([]);
  useEffect(() => {
    axios
      .get(`${MainAPI}/user/show-all-voucher`, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
        },
      })
      .then((res) => {
        console.log(res.data.vouchers.vouchers);
        setVoucherList(res.data.vouchers.vouchers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="voucher-container">
      <h2 style={{ marginLeft: "20px", paddingTop: "20px" }}>Nhận voucher</h2>
      <Slide
        slidesToScroll={1}
        slidesToShow={1}
        autoplay={false}
        responsive={[
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
        ]}
      >
        {voucherList.map((voucher) => (
          <div
            style={{
              textAlign: "center",
              // background: "red",
              padding: "30px 0",
              fontSize: "20px",
            }}
            className="each-slide"
          >
            <div className="first-part">
              <p className="fw-bold">{voucher.discount}%</p>
            </div>

            <div className="second-part">
              <p style={{ fontSize: "15px" }} className="fw-bold">
                Tất cả sản phẩm
              </p>
              <p style={{ fontSize: "13px" }}>{voucher.code}</p>
              <div className="d-flex justify-content-between">
                <span style={{ fontSize: "13px" }}>
                  HSD:{voucher.expiration_date}
                </span>
                <span
                  className="btn btn-danger fw-bold px-4"
                  style={{ borderRadius: "20px" }}
                >
                  Lấy mã
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}
