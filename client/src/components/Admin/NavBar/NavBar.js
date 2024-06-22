import React from "react";
import "./NavBar.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MainAPI } from "../../API";

export default function NavBar() {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const nav = useNavigate();

  const handleLogout = () => {
    axios
      .post(`${MainAPI}/user/logout`, token, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem("accessToken");
        nav("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">Admin Panel</div>
      <ul className="navbar-menu">
        <li>
          <a
            onClick={() => {
              nav("/admin/dashboard");
            }}
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              nav("/admin/user");
            }}
          >
            Users
          </a>
        </li>
        <li>
          <a href="#settings">Settings</a>
        </li>
        <li>
          <a onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </nav>
  );
}
