import React from "react";
import "./InfoDetail.scss";

export default function InfoDetail({ product }) {
  return (
    <>
      <h3>Detail Of Product:</h3>
      <div className="container">
        <div className="row">
          <div className="col-md-12 ">
            <div className="table_info">
              <table>
                <tbody>
                  <tr>
                    <td className="th">Brand</td>
                    <td>{product.brand_name}</td>
                  </tr>
                  <tr>
                    <td className="th">Ogrigin</td>
                    <td>America</td>
                  </tr>
                  <tr>
                    <td className="th">Country</td>
                    <td>Ireland</td>
                  </tr>
                  <tr>
                    <td className="th">Weight</td>
                    <td>900g</td>
                  </tr>
                  <tr>
                    <td className="th">Producer</td>
                    <td>{product.brand_name}  Ireland, Cootehill, Co. Cavan, Ireland</td>
                  </tr>
                  <tr>
                    <td className="th">User manual</td>
                    <td>- Sử dụng theo hướng dẫn của nhân viên y tế.<br />- Nếu pha hơn 1 lần dùng thì lượng pha dư phải giữ lạnh ở nhiệt độ 2-4 độ C và dùng trong 24h.</td>
                  </tr>
                  <tr>
                    <td className="th">Storage instructions</td>
                    <td>- Bảo quản hộp chưa mở nắp ở nhiệt độ phòng.<br />- Hộp đã mở nắp nên sử dụng trong vòng 3 tuần.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
