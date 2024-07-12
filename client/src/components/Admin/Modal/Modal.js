import React, { useState } from "react";
import "./Modal.scss";
import useAuth from "../../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Modal({
  closeModal,
  onSubmit,
  errors,
  listOfVoucher,
  isUsedVoucher,
}) {
  const { auth } = useAuth();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    closeModal();
    if (errors.length === 0) {
    }
  };

  const specificError = (name) => {
    return errors.find((err) => {
      return err.name === name;
    });
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") {
          closeModal();
        }
      }}
    >
      {/* ADMINPAGE */}
      <div className="modal-content">
        <h3>Add new user</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" onChange={handleChange} />
          </div>
          {specificError("username") && (
            <p className="text-danger fw-bold m-0">
              {specificError("username").message}
            </p>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>
          {specificError("password") && (
            <p className="text-danger fw-bold m-0">
              {specificError("password").message}
            </p>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" onChange={handleChange} />
          </div>
          {specificError("email") && (
            <p className="text-danger fw-bold m-0">
              {specificError("email").message}
            </p>
          )}

          <div className="form-group" onChange={handleChange}>
            <label>Role:</label>
            <select className="form-select" name="role_id">
              <option selected>Select the role</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          {specificError("role_id") && (
            <p className="text-danger fw-bold m-0">
              {specificError("role_id").message}
            </p>
          )}

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
