import React from "react";
import "./NavBar.scss";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Admin Panel</div>
      <ul className="navbar-menu">
        <li>
          <a href="#dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/admin/user">Users</a>
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
