import React, { useContext, useEffect, useState } from "react";
import "./OrderUserInfo.scss";
import axios from "axios";
import { MainAPI } from "../../API";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ModalVoucher from "../../../utils/ModalVoucher/ModalVoucher";
import useOrder from "../../../hooks/useOrder";
import { CartContext } from "../CartContext";
import { formatVND } from "../../../utils/Format";
import { FaBitcoin } from "react-icons/fa";

export default function OrderUserInfo() {
  /* USESTATE */
  const [show, setShow] = useState(false);
  const [listOfVoucherById, setListOfVoucherById] = useState([]);
  const [isUsedVoucher, setIsUsedVoucher] = useState(false);
  const [orderItem, setOrderItem] = useState({
    user_id: "",
    total_amount: 0,
    orderItems: [],
  });
  const [temporary, setTemporary] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [point, setPoint] = useState(0);

  /* USECONTEXT */
  const { orderInfomation, setOrderInfomation } = useOrder();
  const { cartList } = useContext(CartContext);
  const { auth } = useAuth();

  const nav = useNavigate();

  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
  };

  /* USEEFFECT GET VOUCHER BY USER ID */
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

  useEffect(() => {
    axios
      .get(`${MainAPI}/user/loyalty-points/${auth.user.user_id}`, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
        },
      })
      .then((res) => {
        console.log(res);
        setPoint(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // USEEFFECT CALCULATE TOTAL
  useEffect(() => {
    const { temporaryTemp, discountTemp, totalTemp } = handleCalculate();

    setTemporary(temporaryTemp);
    setDiscount(discountTemp);
    setTotal(totalTemp);

    setOrderInfomation({
      ...orderInfomation,
      temporary: temporary,
      total: total,
    });
  }, [cartList, orderInfomation.discount, checked]);

  console.log(orderItem);
  const handleClick = () => {
    axios
      .post(`${MainAPI}/user/ready-to-checkout`, orderItem, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
        },
      })
      .then((res) => {
        console.log(res.data);
        setOrderInfomation({
          ...orderInfomation,
          order_id: res.data.order_id,
        });
        nav("/order-payment");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCalculate = () => {
    const temporaryTemp = cartList.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    let discountTemp = orderInfomation.discount * temporaryTemp;
    if (isNaN(discountTemp)) {
      discountTemp = 0;
    }

    let totalTemp = temporaryTemp - discountTemp;

    if (checked) {
      totalTemp -= point;
    }

    setOrderItem({
      ...orderItem,
      total_amount: totalTemp,
      user_id: auth.user.user_id,
      orderItems: cartList,
    });

    return { temporaryTemp, discountTemp, totalTemp };
  };
  console.log(orderItem);

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
              <ModalVoucher
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
          <div className="mt-2 ms-3 d-flex justify-content-between">
            <h5>
              Mart Xu <FaBitcoin color="yellow" />
            </h5>
            <button
              className={`custom-button ${checked ? "checked" : ""}`}
              onClick={handleToggle}
            >
              <span className="number">[-{point}đ]</span>
              <span className="checkmark">{checked ? "✔" : "✖"}</span>
            </button>
          </div>
        </div>
      </div>
      <div className="box-block">
        <span className="box-block-title">Tổng tiền</span>
        <div className="summary-item">
          Tạm tính: <span>{formatVND(temporary)}</span>
        </div>
        <div className="summary-item">
          Giảm giá sản phẩm: <span>-{formatVND(discount)}</span>
        </div>
        {checked && (
          <div className="summary-item">
            Đã dùng Mart Xu: <span>-{point} ₫</span>
          </div>
        )}
        <div className="summary-item">
          Tổng tiền: <span>{formatVND(total)} (Đã bao gồm VAT)</span>
        </div>
        <button
          className="btn btn-order"
          onClick={handleClick}
          style={{ background: "#FF199B", margin: 0, color: "white" }}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
