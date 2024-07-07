import React from "react";
import "./UseFull.scss";
import { listUsefull } from "./UsefullList";
import { FaRegEye } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";

export default function UseFull() {
  return (
    <div style={{ marginTop: "15px" }}>
      <div className="d-flex justify-content-between align-center">
        <h2>Thông tin bổ ích</h2>
        <span>
          <Link
            to={"/blogs"}
            style={{
              textDecoration: "none",
              color: "FF3E9F",
            }}
          >
            Xem tất cả <IoIosArrowDropright />
          </Link>
        </span>
      </div>
      <div className="usefull_container ">
        {listUsefull.map((usefull) => {
          return (
            <Link
              to={`/blogs/post/${usefull.id}`}
              className="usefull_detail"
              key={usefull.id}
            >
              <div className="usefull-img-container">
                <img src={usefull.img} />
              </div>
              <p
                className="fw-bold mt-2"
                style={{ lineHeight: "17px", fontSize: "14px" }}
              >
                {usefull.info}
              </p>
              <p className="mt-auto d-flex justify-content-between">
                <span>
                  {" "}
                  <FaRegEye /> {usefull.view}
                </span>
                <span className="fs-5">
                  <IoIosArrowDropright />
                </span>
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
