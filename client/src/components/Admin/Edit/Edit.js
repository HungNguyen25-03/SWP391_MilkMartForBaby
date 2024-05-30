import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./Edit.scss";
import Select from "react-select";

export default function Edit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [user, setUser] = useState({
    name: "",
    role: "",
  });
  const [role, setRole] = useState("");
  useEffect(() => {
    fetch("http://127.0.0.1:1880/user/1")
      .then((res) => res.json())
      .then((data) => {
        setUser({ name: data.name, role: data.role });
        setRole(data.role);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
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
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Entername"
                  value={user.name}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      name: e.target.value,
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
                  <option value="engineer">Engineer</option>
                  <option value="pm">Project Manager</option>
                  <option value="estimator">Estimator</option>
                  <option value="surveyor">Surveyor</option>
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
