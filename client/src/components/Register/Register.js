import React, { useState } from "react";
import "./Register.scss";
import { FaUser, FaLock, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MainAPI } from "../API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEyeSharp } from "react-icons/io5";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [ShowPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const nav = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${MainAPI}/user/register`, user)
      .then((res) => {
        toast.success("Đăng kí thành công! Đang chuyển hướng");
        setTimeout(() => {
          nav("/login");
        });
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

  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPassConfirm = () => {
    setShowPasswordConfirm(!ShowPasswordConfirm);
  };

  return (
    <>
      <div className="register_container d-flex justify-content-center align-items-center">
        <ToastContainer autoClose={2000} />
        <div className="register-form">
          <h2 className="mt-2">Đăng kí</h2>
          <form onSubmit={handleSubmit}>
            <div className="register_info">
              <div className="register_detail">
                <FaUser />
                <input
                  type="text"
                  value={user.username}
                  placeholder="Tên đăng nhập"
                  name="username"
                  onChange={handleChange}
                />
              </div>
              {specificError("username") && (
                <p className="text-danger fw-bold m-0">
                  {specificError("username").message}
                </p>
              )}

              <div className="register_detail">
                <MdEmail />
                <input
                  type="text"
                  value={user.email}
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              {specificError("email") && (
                <p className="text-danger fw-bold m-0">
                  {specificError("email").message}
                </p>
              )}

              <div className="register_detail">
                <FaLock />
                <input
                  type={showPassword === false ? "password" : "text"}
                  value={user.password}
                  placeholder="Mật khẩu"
                  name="password"
                  onChange={handleChange}
                />
                <span className="eyes" onClick={handleShowPass}>
                  {showPassword === true ? <FaEyeSlash /> : <IoEyeSharp />}
                </span>
              </div>
              {specificError("password") && (
                <p className="text-danger fw-bold m-0">
                  {specificError("password").message}
                </p>
              )}

              <div className="register_detail">
                <FaLock />
                <input
                  type={ShowPasswordConfirm === false ? "password" : "text"}
                  value={user.confirmPassword}
                  placeholder="Nhập lại mật khẩu"
                  name="confirmPassword"
                  onChange={handleChange}
                />
                <span className="eyes" onClick={handleShowPassConfirm}>
                  {ShowPasswordConfirm === true ? (
                    <FaEyeSlash />
                  ) : (
                    <IoEyeSharp />
                  )}
                </span>
              </div>
              {specificError("confirm password") && (
                <p className="text-danger fw-bold m-0">
                  {specificError("confirm password").message}
                </p>
              )}
            </div>
            <div className="other">
              <div>
                <Link to="/login">Ba mẹ đã có tài khoản?</Link>
              </div>
            </div>

            <input type="submit" value="Sign up" className="register-btn" />
          </form>
        </div>
      </div>
    </>
  );
}
