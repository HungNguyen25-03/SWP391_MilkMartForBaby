import React, { useEffect, useState } from "react";
import "./Voucher.scss";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import axios from "axios";
import { MainAPI } from "../../../API";
import useAuth from "../../../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Voucher() {
  const [voucherList, setVoucherList] = useState([]);
  const nav = useNavigate();
  const [isGet, setIsGet] = useState({
    get: false,
    voucher_id: "",
  });
  const { auth } = useAuth();

  useEffect(() => {
    axios
      .get(`${MainAPI}/user/show-all-voucher`)
      .then((res) => {
        setVoucherList(res.data.vouchers.vouchers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (e) => {
    console.log(e.target.value);
    console.log(auth.user.user_id);
    axios
      .post(
        `${MainAPI}/user/claim-voucher`,
        {
          user_id: auth.user.user_id,
          voucher_id: e.target.value,
        },
        {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setIsGet({
          get: true,
          voucher_id: e.target.value,
        });
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
  };

  return (
    <div className="voucher-container">
      <ToastContainer autoClose={2000} />
      <h2 style={{ marginLeft: "20px", paddingTop: "20px" }}>Nhận voucher</h2>
      <Slide
        slidesToScroll={1}
        slidesToShow={3}
        autoplay={false}
        indicators={true}
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
            key={voucher.code}
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
                {isGet.get && isGet.voucher_id === voucher.voucher_id ? (
                  <>
                    <button
                      className="btn btn-danger fw-bold px-4"
                      style={{ borderRadius: "20px" }}
                      value={voucher.voucher_id}
                      onClick={() => {
                        nav("/cart");
                      }}
                    >
                      Mua hàng
                    </button>
                  </>
                ) : (
                  <>
                    {" "}
                    <button
                      className="btn btn-danger fw-bold px-4"
                      style={{ borderRadius: "20px" }}
                      value={voucher.voucher_id}
                      onClick={handleClick}
                    >
                      Lấy mã
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}
