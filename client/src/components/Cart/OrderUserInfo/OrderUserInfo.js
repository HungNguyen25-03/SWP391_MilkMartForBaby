import React, { useEffect, useState } from "react";
import "./OrderUserInfo.scss";
import Modal from "../../Admin/Modal/Modal";
import axios from "axios";
import { MainAPI } from "../../API";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function OrderUserInfo() {
  const [show, setShow] = useState(false);
  const [listOfVoucherById, setListOfVoucherById] = useState([]);
  const [isUsedVoucher, setIsUsedVoucher] = useState(false);
  const { auth } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`${MainAPI}/user/show-voucher-by-user/${auth.user.user_id}`, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
        },
      })
      .then((res) => {
        console.log(res.data.vouchers.vouchers);
        setListOfVoucherById(res.data.vouchers.vouchers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = () => {
    nav("/order-payment");
  };

  return (
    <div className="fixed-cart">
      <div className="box-block">
        <span className="box-block-title">Địa chỉ nhận hàng</span>
        <div className="user-address">
          <div className="show-phone-address">
            <span>Võ Minh Trí</span>
            <span>092843746</span>
          </div>
          <div className="show-address">
            <span>
              Tòa S1.02 Vinhomes Grand Park, Nguyễn Xiển, Long Bình, Thủ Đức,
              Thành phố Hồ Chí Minh, Việt Nam
            </span>
          </div>
        </div>
      </div>
      <div className="box-block">
        <span className="box-block-title">Ưu đãi và giảm giá</span>
        <div className="user-address">
          <div className="show-phone-address">
            <button
              className="btn btn-primary"
              onClick={() => {
                setShow(true);
              }}
            >
              {isUsedVoucher ? "Đã áp dụng 1 voucher" : "Sử dụng mã giảm giá"}
            </button>

            {/* MODAL */}
            {show && (
              <Modal
                listOfVoucher={listOfVoucherById}
                isUsedVoucher={() => {
                  setIsUsedVoucher(true);
                }}
                closeModal={() => {
                  setShow(false);
                }}
                onSubmit={() => {}}
                errors={[]}
              />
            )}
          </div>
        </div>
      </div>
      <div className="box-block">
        <span className="box-block-title">Tổng tiền</span>
        <div className="user-address">
          <div className="temporary">
            <span>Tạm tính</span>
            <span>1120000</span>
          </div>
          <div className="show-phone-address">
            <span>Tổng tiền</span>
            <span>1120000</span>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-primary" onClick={handleClick}>
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
