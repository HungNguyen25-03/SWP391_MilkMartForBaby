import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import DataTable from "react-data-table-component";
import { MdDelete, MdModeEdit } from "react-icons/md";
import "./UserManagement.scss";
import Modal from "../Modal/Modal";

export default function UserManagement() {
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

  function handleSubmit(newRow) {
    setRecords([...records, newRow]);
    setData([...data, newRow]);
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
          <button
            onClick={() => {
              handleDelete(row.id);
            }}
          >
            <MdDelete color="red" />
          </button>
          <button
            onClick={() => {
              handleDelete(row.id);
            }}
          >
            <MdModeEdit color="green" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="userManage_container">
      <NavBar />
      <div className="content">
        <h1>User Management</h1>
        <h2>Current user</h2>
        <div className="user_manage">
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
        <div className="table">
          <DataTable
            columns={column}
            data={records}
            selectableRows
            fixedHeader
            className="table-content"
          />
        </div>
      </div>
    </div>
  );
}
