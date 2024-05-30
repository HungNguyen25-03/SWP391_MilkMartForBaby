import React from "react";
import "./NavBar.scss";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const nav = useNavigate();

  return (
    <nav className="navbar-container">
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
          <a href="#logout">Logout</a>
        </li>
      </ul>
    </nav>
  );
}
