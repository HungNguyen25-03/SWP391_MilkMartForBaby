import React from "react";
import "./Voucher.scss";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

export default function Voucher() {
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
            <p className="fw-bold">100,000đ</p>
          </div>

          <div className="second-part">
            <p style={{ fontSize: "15px" }} className="fw-bold">
              Tất cả sản phẩm
            </p>
            <p style={{ fontSize: "13px" }}>
              Trừ sữa cho trẻ dưới 12 tháng tuổi
            </p>
            <div className="d-flex justify-content-between">
              <span style={{ fontSize: "13px" }}>HSD:24/06</span>
              <span
                className="btn btn-danger fw-bold px-4"
                style={{ borderRadius: "20px" }}
              >
                Lấy mã
              </span>
            </div>
          </div>
        </div>
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
            <p className="fw-bold">100,000đ</p>
          </div>

          <div className="second-part">
            <p style={{ fontSize: "15px" }} className="fw-bold">
              Tất cả sản phẩm
            </p>
            <p style={{ fontSize: "13px" }}>
              Trừ sữa cho trẻ dưới 12 tháng tuổi
            </p>
            <div className="d-flex justify-content-between">
              <span style={{ fontSize: "13px" }}>HSD:24/06</span>
              <span
                className="btn btn-danger fw-bold px-4"
                style={{ borderRadius: "20px" }}
              >
                Lấy mã
              </span>
            </div>
          </div>
        </div>
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
            <p className="fw-bold">100,000đ</p>
          </div>

          <div className="second-part">
            <p style={{ fontSize: "15px" }} className="fw-bold">
              Tất cả sản phẩm
            </p>
            <p style={{ fontSize: "13px" }}>
              Trừ sữa cho trẻ dưới 12 tháng tuổi
            </p>
            <div className="d-flex justify-content-between">
              <span style={{ fontSize: "13px" }}>HSD:24/06</span>
              <span
                className="btn btn-danger fw-bold px-4"
                style={{ borderRadius: "20px" }}
              >
                Lấy mã
              </span>
            </div>
          </div>
        </div>
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
            <p className="fw-bold">100,000đ</p>
          </div>

          <div className="second-part">
            <p style={{ fontSize: "15px" }} className="fw-bold">
              Tất cả sản phẩm
            </p>
            <p style={{ fontSize: "13px" }}>
              Trừ sữa cho trẻ dưới 12 tháng tuổi
            </p>
            <div className="d-flex justify-content-between">
              <span style={{ fontSize: "13px" }}>HSD:24/06</span>
              <span
                className="btn btn-danger fw-bold px-4"
                style={{ borderRadius: "20px" }}
              >
                Lấy mã
              </span>
            </div>
          </div>
        </div>
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
            <p className="fw-bold">100,000đ</p>
          </div>

          <div className="second-part">
            <p style={{ fontSize: "15px" }} className="fw-bold">
              Tất cả sản phẩm
            </p>
            <p style={{ fontSize: "13px" }}>
              Trừ sữa cho trẻ dưới 12 tháng tuổi
            </p>
            <div className="d-flex justify-content-between">
              <span style={{ fontSize: "13px" }}>HSD:24/06</span>
              <span
                className="btn btn-danger fw-bold px-4"
                style={{ borderRadius: "20px" }}
              >
                Lấy mã
              </span>
            </div>
          </div>
        </div>
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
            <p className="fw-bold">100,000đ</p>
          </div>

          <div className="second-part">
            <p style={{ fontSize: "15px" }} className="fw-bold">
              Tất cả sản phẩm
            </p>
            <p style={{ fontSize: "13px" }}>
              Trừ sữa cho trẻ dưới 12 tháng tuổi
            </p>
            <div className="d-flex justify-content-between">
              <span style={{ fontSize: "13px" }}>HSD:24/06</span>
              <span
                className="btn btn-danger fw-bold px-4"
                style={{ borderRadius: "20px" }}
              >
                Lấy mã
              </span>
            </div>
          </div>
        </div>
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
            <p className="fw-bold">100,000đ</p>
          </div>

          <div className="second-part">
            <p style={{ fontSize: "15px" }} className="fw-bold">
              Tất cả sản phẩm
            </p>
            <p style={{ fontSize: "13px" }}>
              Trừ sữa cho trẻ dưới 12 tháng tuổi
            </p>
            <div className="d-flex justify-content-between">
              <span style={{ fontSize: "13px" }}>HSD:24/06</span>
              <span
                className="btn btn-danger fw-bold px-4"
                style={{ borderRadius: "20px" }}
              >
                Lấy mã
              </span>
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
}
