import React from "react";
import "./OrderUserInfo.scss";

export default function OrderUserInfo() {
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
            <span>Võ Minh Trí</span>
            <span>092843746</span>
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
        </div>
      </div>
    </div>
  );
}
