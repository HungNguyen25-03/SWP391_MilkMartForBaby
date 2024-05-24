import React, { useState } from "react";
import "./login.scss";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

function Login() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleOnchangeUserID = (event) => {
    setUserID(event.target.value);
  };

  const handleOnchangePassWord = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="login_container">
        <div className="column">
          <h2>Log In</h2>

          <form>
            <div className="login_info">
              <div className="login_detail">
                <FaUser />
                <input
                  type="text"
                  value={userID}
                  placeholder="Email or Phone Number"
                  onChange={handleOnchangeUserID}
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

            <input type="submit" value="Log In" />
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
