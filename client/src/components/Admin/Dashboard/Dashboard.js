import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import NavBar from "../NavBar/NavBar";

import "./Dashboard.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,

  PointElement,
  LineElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

export const options2 = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const items = ["Jeans", "Shirts", "Belts", "Caps", "Other"];

export const data2 = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: items.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export const data3 = {
  labels: [],
  datasets: [
    {
      data: [],
    },
  ],
};

export const options3 = {
  options: {
    responsive: false,
    legend: {
      display: false,
    },
    elements: {
      line: {
        borderColor: "#000000",
        borderWidth: 1,
      },
      point: {
        radius: 0,
      },
    },
    tooltips: {
      enabled: false,
    },
    scales: {
      yAxes: [
        {
          display: false,
        },
      ],
      xAxes: [
        {
          display: false,
        },
      ],
    },
  },
};

export default function Dashboard() {
  return (
    <>
      <div className="dashboard_container">
        <NavBar />
        <div className="content">
          <h1>Dashboard</h1>
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Tổng số sản phẩm</div>
                  <div className="card-content">20tr</div>
                </div>
                <div>
                  <Line options={options3} data={data3} />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Doanh thu trong ngày</div>
                  <div className="card-content">100</div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Tổng số đơn hàng</div>
                  <div className="card-content">100</div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="chart-col-vertical">
              <p>Tổng doanh thu</p>
              <div className="chart">
                <Bar options={options} data={data} />
              </div>
            </div>
            <div className="chart-col-horizontal">
              <p>Số lượng đã bán của mỗi sản phẩm</p>
              <Bar options={options2} data={data2} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
