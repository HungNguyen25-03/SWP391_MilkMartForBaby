import React, { useState } from "react";
import "./Register.scss";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MainAPI } from "../API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
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
        toast.success(res.data.message);
        nav("/login");
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
    <>
      <div className="register_container d-flex justify-content-center align-items-center">
        <ToastContainer autoClose={2000} />
        <div className="column_register">
          <h2 className="mt-2">Sign up</h2>
          <form onSubmit={handleSubmit}>
            <div className="register_info">
              <div className="register_detail">
                <FaUser />
                <input
                  type="text"
                  value={user.username}
                  placeholder="Username"
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
                  type="password"
                  value={user.password}
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              {specificError("password") && (
                <p className="text-danger fw-bold m-0">
                  {specificError("password").message}
                </p>
              )}

              <div className="register_detail">
                <FaLock />
                <input
                  type="password"
                  value={user.confirmPassword}
                  placeholder="Confirm password"
                  name="confirmPassword"
                  onChange={handleChange}
                />
              </div>
              {specificError("confirm password") && (
                <p className="text-danger fw-bold m-0">
                  {specificError("confirm password").message}
                </p>
              )}
            </div>
            <div className="other">
              <div>
                <Link to="/login">Already have an account?</Link>
              </div>
            </div>

            <input type="submit" value="Sign up" />
          </form>
        </div>
      </div>
    </>
  );
}
