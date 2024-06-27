import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Dashboard.scss";
import Chart from "./Chart/Chart";
import { PiMoney } from "react-icons/pi";
import { BsBoxSeam, BsCart3 } from "react-icons/bs";
import DateRangeButton from "../../../utils/Button/DateRangeButton";

export default function Dashboard() {
  return (
    <>
      <NavBar />
      <div className="dashboard_container">
        <div className="content container">
          <div className="d-flex justify-content-between">
            <h1 className="mt-0">Dashboard</h1>
            <div>
              <DateRangeButton />
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col col-md-4">
              <div className="card card-content m-0">
                <div className="card-body col-10">
                  <div className="card-title fw-bold">Tổng số sản phẩm</div>
                  <div className="d-flex justify-content-between m-0">
                    <div>20tr</div>
                    <div className="col-2 icon">
                      <BsBoxSeam />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-md-4">
              <div className="card card-content m-0">
                <div className="card-body col-10">
                  <div className="card-title fw-bold">Doanh thu trong ngày</div>
                  <div className="d-flex justify-content-between m-0">
                    <div>100</div>
                    <div className="col-2 icon">
                      <PiMoney />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-md-4">
              <div className="card card-content m-0">
                <div className="card-body col-10">
                  <div className="card-title fw-bold">Tổng số đơn hàng</div>
                  <div className="d-flex justify-content-between m-0">
                    <div>100</div>
                    <div className="col-2 icon">
                      <BsCart3 />
                    </div>
                  </div>
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
