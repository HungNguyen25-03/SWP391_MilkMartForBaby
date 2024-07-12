import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./Edit.scss";
import { MainAPI } from "../../API";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Edit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    role_id: "",
  });
  const [errors, setErrors] = useState([]);

  console.log(user);
  const [role, setRole] = useState("");
  let passwordFromDb;

  useEffect(() => {
    fetch(`${MainAPI}/admin/getUser/${id}`, {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const result = data.user[0];
        setUser({
          username: result.username,
          role_id: result.role_id,
          password: result.password,
          email: result.email,
        });
        setRole(result.role_id);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${MainAPI}/admin/update/${id}`, user, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          nav("/admin/user");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

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
                <label>Role:</label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              <br />
              <button className="btn btn-info">Lưu</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
