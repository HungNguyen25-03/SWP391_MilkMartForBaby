import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import DataTable from "react-data-table-component";
import { MdModeEdit } from "react-icons/md";
import "./UserManagement.scss";
import Modal from "../Modal/Modal";
import { DeleteIcon } from "../../../utils/Icon/DeleteIcon";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function UserManagement() {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:1880/user")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setRecords(data);
      });
  }, []);

  function handleFilter(event) {
    const newData = data.filter((record) => {
      return record.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  function handleDelete(id) {
    const newData = records.filter((record) => record.id !== id);
    setRecords(newData);
    setData(newData);
  }

  function handleSubmit(newUser) {
    console.log(newUser);
    axios.post("http://localhost:4000/admin/create", newUser).then((res) => {
      toast.success(res.data.message);
    });
  }

  const column = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      cell: (row) => (
        <div className="action">
          <span
            className="action-btn"
            onClick={() => {
              handleDelete(row.id);
            }}
          >
            <DeleteIcon color="red" />
          </span>
          <span
            className="action-btn"
            onClick={() => {
              nav(`/admin/edit/${row.id}`);
            }}
          >
            <MdModeEdit color="green" />
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="userManage_container">
      <NavBar />
      <div className="content">
        <ToastContainer autoClose={2000} />
        <h1 className="mt-0">User Management</h1>
        <div className="user_manage mt-4">
          <div className="search">
            <label>Search: </label>
            <input type="text" onChange={handleFilter}></input>
          </div>
          <div className="add">
            <button
              className="btn"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Add User
            </button>
            {modalOpen && (
              <Modal
                closeModal={() => {
                  setModalOpen(false);
                }}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
        <div className="table mt-3">
          <DataTable
            columns={column}
            data={records}
            selectableRows
            pagination
            paginationRowsPerPageOptions={[6, 10]}
            className="table-content"
          />
        </div>
      </div>
    </div>
  );
}
