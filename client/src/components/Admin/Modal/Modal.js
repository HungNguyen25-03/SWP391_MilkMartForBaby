import React, { useState } from "react";
import "./Modal.scss";
import axios from "axios";
import { MainAPI } from "../../API";
import useAuth from "../../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Modal({
  closeModal,
  onSubmit,
  errors,
  listOfVoucher,
  isUsedVoucher,
}) {
  const [isHome, setIsHome] = useState(true);
  const { auth } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    role_id: "",
  });

  const handleApplyVoucher = (e) => {
    console.log(e.target.value);
    console.log(auth.user.user_id);
    axios
      .post(
        `${MainAPI}/user/apply-voucher`,
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
        isUsedVoucher();
        closeModal();
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.errors[0].message);
      });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    closeModal();
    if (errors.length === 0) {
    }
  };

  const specificError = (name) => {
    return errors.find((err) => {
      return err.name === name;
    });
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") {
          closeModal();
        }
      }}
    >
      {isHome ? (
        <>
          {/* HOMEPAGE */}
          <div className="modal-content">
            <ToastContainer autoClose={2000} />
            <h3 className="d-flex justify-content-start">Voucher của bạn</h3>
            {listOfVoucher.map((voucher) => (
              <div
                key={voucher.code}
                style={{
                  textAlign: "center",
                  // background: "red",
                  padding: "5px 0",
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
                    <button
                      className="btn btn-danger fw-bold px-4"
                      style={{
                        borderRadius: "20px",
                        color: "white",
                        backgroundColor: "#ff0064",
                      }}
                      value={voucher.voucher_id}
                      onClick={handleApplyVoucher}
                    >
                      Lấy mã
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* ADMINPAGE */}
          <div className="modal-content">
            <h3>Add new user</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={handleChange} />
              </div>
              {specificError("username") && (
                <p className="text-danger fw-bold m-0">
                  {specificError("username").message}
                </p>
              )}

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              {specificError("password") && (
                <p className="text-danger fw-bold m-0">
                  {specificError("password").message}
                </p>
              )}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" onChange={handleChange} />
              </div>
              {specificError("email") && (
                <p className="text-danger fw-bold m-0">
                  {specificError("email").message}
                </p>
              )}

              <div className="form-group" onChange={handleChange}>
                <label>Role:</label>
                <select className="form-select" name="role_id">
                  <option selected>Select the role</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              {specificError("role_id") && (
                <p className="text-danger fw-bold m-0">
                  {specificError("role_id").message}
                </p>
              )}

              <div className="d-flex justify-content-space-between ">
                <button className=" btn bg-secondary" onClick={closeModal}>
                  Close
                </button>
                <button type="submit" className="btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
