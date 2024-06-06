import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Dashboard.scss";
import Chart from "./Chart/Chart";
import { PiMoney } from "react-icons/pi";
import { BsBoxSeam, BsCart3 } from "react-icons/bs";

export default function Dashboard() {
  return (
    <>
      <div className="dashboard_container">
        <NavBar />
        <div className="content">
          <h1 className="mt-0">Dashboard</h1>
          <div className="row">
            <div className="col col-4">
              <div className="card card-content">
                <div className="card-body col-10">
                  <div className="card-title fw-bold">Tổng số sản phẩm</div>
                  <div>20tr</div>
                </div>
                <div className="col-2 icon">
                  <BsBoxSeam />
                </div>
              </div>
            </div>
            <div className="col col-4">
              <div className="card card-content">
                <div className="card-body col-10">
                  <div className="card-title fw-bold">Doanh thu trong ngày</div>
                  <div>100</div>
                </div>
                <div className="col-2 icon">
                  <PiMoney />
                </div>
              </div>
            </div>
            <div className="col col-4">
              <div className="card card-content">
                <div className="card-body col-10">
                  <div className="card-title fw-bold">Tổng số đơn hàng</div>
                  <div>100</div>
                </div>
                <div className="col-2 icon">
                  <BsCart3 />
                </div>
              </div>
            </div>
          </div>
          <Chart />
        </div>
      </div>
    </>
  );
}
