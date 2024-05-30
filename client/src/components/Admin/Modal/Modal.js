import React, { useState } from "react";
import "./Modal.scss";

export default function Modal({ closeModal, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };

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
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input type="text" name="role" onChange={handleChange} />
          </div>
          <button type="submit" className="btn" onSubmit={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
