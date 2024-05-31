import React, { useState } from "react";
import "./Modal.scss";

export default function Modal({ closeModal, onSubmit }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    role_id: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  console.log(form);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal-content">
        <h3>Add new user</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" onChange={handleChange} />
          </div>
          <div className="form-group" onChange={handleChange}>
            <label>Role:</label>
            <select className="form-select" name="role_id">
              <option selected>Select the role</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <div className="d-flex justify-content-space-between ">
            <button className=" btn bg-secondary" onClick={closeModal}>
              Close
            </button>
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
