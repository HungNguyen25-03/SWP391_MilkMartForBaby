import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./Edit.scss";
import { MainAPI } from "../../API";
import axios from "axios";
import { toast } from "react-toastify";
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

  console.log(user);
  const [role, setRole] = useState("");
  let passwordFromDb;

  useEffect(() => {
    fetch(`${MainAPI}/admin/getUser/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const result = data.user[0];
        passwordFromDb = result.password;
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
    if (user.password === "") {
      user.password = passwordFromDb;
    }
    e.preventDefault();
    axios.put(`${MainAPI}/admin/update/${id}`, user).then((res) => {
      toast.success(res.data.message);
    });
    nav("/admin/user");
  };
  return (
    <div className="edit-container">
      <NavBar />
      <div className="content">
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
          <div className="w-50 border bg-secondary text-white p-5">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Username: </label>
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
              <div>
                <label htmlFor="password">Password: </label>
                <input
                  type="text"
                  name="password"
                  className="form-control"
                  placeholder="Enterpassword"
                  value=""
                  onChange={(e) => {
                    setUser({
                      ...user,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
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
              <button className="btn btn-info">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
