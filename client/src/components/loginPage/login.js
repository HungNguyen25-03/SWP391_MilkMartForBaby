import React, { useEffect, useState } from "react";
import "./login.scss";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { MainAPI } from "../API";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Login() {
  const { setAuth } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from || { pathname: "/" };

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

  const login = async () => {
    const data = await fetch(`${MainAPI}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return res.json();
    });
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login();
    console.log(response);
    if (response.status === 200) {
      const user = response.user;
      const role = response.user.role_id;
      const accessToken = response.accessToken;
      console.log(response.message);
      setAuth({ user, role, accessToken });
      localStorage.setItem("accessToken", JSON.stringify(response.accessToken));
      nav(from, { replace: true });
    } else {
      console.log(response.message);
    }
  };

  return (
    <>
      <div className="login_container">
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
                <a href="/register">Register an account</a>
              </div>
              <div>
                <a href="#">Forget Password?</a>
              </div>
            </div>

            <button type="submit" value="Log In"></button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
