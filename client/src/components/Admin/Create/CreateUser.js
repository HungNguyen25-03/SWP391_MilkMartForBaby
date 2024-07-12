import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainAPI } from "../../API";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import NavBar from "../NavBar/NavBar";

export default function CreateUser() {
  const nav = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    role_id: "",
  });
  const [errors, setErrors] = useState([]);
  console.log(user);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${MainAPI}/admin/create`, user, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setTimeout(() => {
            nav("/admin/user");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  }
  const specificError = (name) => {
    return errors.find((err) => {
      return err.name === name;
    });
  };

  return (
    <div className="edit-container">
      <ToastContainer />
      <NavBar />
      <div className="content">
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
          <div className="w-50 border bg-secondary text-white p-5">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Tên đăng nhập: </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Entername"
                  value={user.username}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      username: e.target.value,
                    });
                  }}
                />
              </div>
              {specificError("username") && (
                <p className="text-danger fw-bold m-0">
                  {specificError("username").message}
                </p>
              )}

              <div>
                <label htmlFor="email">Email: </label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="Enteremail"
                  value={user.email}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
              {specificError("email") && (
                <p className="text-danger fw-bold m-0">
                  {specificError("email").message}
                </p>
              )}

              <div>
                <label htmlFor="email">Mật khẩu: </label>
                <input
                  type="text"
                  name="password"
                  className="form-control"
                  placeholder="Mật khẩu"
                  value={user.password}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
              {specificError("password") && (
                <p className="text-danger fw-bold m-0">
                  {specificError("password").message}
                </p>
              )}

              <div>
                <label>Role:</label>
                <select
                  className="form-select"
                  value={user.role_id}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      role_id: e.target.value,
                    })
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              <br />
              <button className="btn btn-info">Tạo</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
