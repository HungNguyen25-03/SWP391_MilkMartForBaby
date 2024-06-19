// import React, { useEffect, useState } from "react";
// import "./login.scss";
// import { FaUser } from "react-icons/fa";
// import { FaLock } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import { IoEyeSharp } from "react-icons/io5";
// import { MainAPI } from "../API";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import useAuth from "../../hooks/useAuth";

// function Login() {
//   const { setAuth } = useAuth();
//   const nav = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from || { pathname: "/home" };
//   const [user, setUser] = useState({});
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   console.log(user);

//   const handleOnchangeEmail = (event) => {
//     setEmail(event.target.value);
//   };

//   const handleOnchangePassWord = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleShowPass = () => {
//     setShowPassword(!showPassword);
//   };

//   const login = async () => {
//     const data = await fetch(`${MainAPI}/user/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     }).then((res) => {
//       return res.json();
//     });
//     return data;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await login();
//     if (response.status === 200) {
//       setUser(response.user);
//       const user = response.user;
//       const role = response.user.role_id;
//       const accessToken = response.accessToken;

//       setAuth({ user, role, accessToken });
//       localStorage.setItem("accessToken", JSON.stringify(response.accessToken));
//       if (role === "admin") {
//         nav("/admin");
//       } else if (role === "staff") {
//         nav("/staff");
//       } else {
//         nav(from, { replace: true });
//       }
//     } else {
//       toast.error(response.message);
//     }
//   };

//   return (
//     <>
//       <div className="login_container d-flex justify-content-center align-items-center">
//         <ToastContainer autoClose={2000} />
//         <div className="column">
//           <h2>Log In</h2>

//           <form onSubmit={handleSubmit}>
//             <div className="login_info">
//               <div className="login_detail">
//                 <FaUser />
//                 <input
//                   type="text"
//                   value={email}
//                   placeholder="Email"
//                   onChange={handleOnchangeEmail}
//                   required
//                 />
//               </div>

//               <div className="login_detail">
//                 <FaLock />
//                 <input
//                   type={showPassword === false ? "password" : "text"}
//                   value={password}
//                   placeholder="Password"
//                   onChange={handleOnchangePassWord}
//                   required
//                 />
//                 <span className="eyes" onClick={handleShowPass}>
//                   {showPassword === true ? <FaEyeSlash /> : <IoEyeSharp />}
//                 </span>
//               </div>
//             </div>
//             <div className="other">
//               <div>
//                 <Link to="/register">Register an account</Link>
//               </div>
//               <div>
//                 <a href="#">Forget Password?</a>
//               </div>
//             </div>

//             <input type="submit" value="Log In"></input>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;



import React, { useEffect, useState } from "react";
import "./login.scss";
import { FaUser, FaLock, FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { MainAPI } from "../API";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

function Login() {
  const { setAuth } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from || { pathname: "/home" };
  const [user, setUser] = useState({});
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
    if (response.status === 200) {
      setUser(response.user);
      const user = response.user;
      const role = response.user.role_id;
      const accessToken = response.accessToken;

      setAuth({ user, role, accessToken });
      localStorage.setItem("accessToken", JSON.stringify(response.accessToken));
      if (role === "admin") {
        nav("/admin");
      } else if (role === "staff") {
        nav("/staff");
      } else {
        nav(from, { replace: true });
      }
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <div className="login-container">
        <ToastContainer autoClose={2000} />
        <div className="login-form">
          <h2>Log In</h2>

          <form onSubmit={handleSubmit}>
            <div className="login-info">
              <div className="login-detail">
                <FaUser />
                <input
                  type="text"
                  value={email}
                  placeholder="Email"
                  onChange={handleOnchangeEmail}
                  required
                />
              </div>

              <div className="login-detail">
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
              <Link to="/register">Register an account</Link>
              <a href="#">Forget Password?</a>
            </div>

            <input type="submit" value="Log In" className="login-btn"></input>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
