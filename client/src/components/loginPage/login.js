import React, { useEffect, useState } from "react";
import "./login.scss";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { MainAPI } from "../API";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleOnchangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleOnchangePassWord = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`${MainAPI}/user/login`, { email, password })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          nav("/home");
        } else {
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <div className="login_container d-flex justify-content-center align-items-center">
        <ToastContainer autoClose={2000} />
        <div className="column">
          <h2>Log In</h2>

          <form onSubmit={handleSubmit}>
            <div className="login_info">
              <div className="login_detail">
                <FaUser />
                <input
                  type="text"
                  value={email}
                  placeholder="Email"
                  onChange={handleOnchangeEmail}
                  required
                />
              </div>

              <div className="login_detail">
                <FaLock />
                <input
                  type={showPassword === false ? "password" : "text"}
                  value={password}
                  placeholder="Password"
                  onChange={handleOnchangePassWord}
                  required
                />
                <span className="eyes" onClick={handleShowPass}>
                  {showPassword === true ? <FaEyeSlash /> : <IoEyeSharp />}
                </span>
              </div>
            </div>
            <div className="other">
              <div>
                <Link to="/register">Register an account</Link>
              </div>
              <div>
                <a href="#">Forget Password?</a>
              </div>
            </div>

            <input type="submit" value="Log In"></input>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
