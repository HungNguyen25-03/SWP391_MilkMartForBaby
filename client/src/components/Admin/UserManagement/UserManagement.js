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
import { MainAPI } from "../../API";

export default function UserManagement() {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data);
  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  async function fetchData() {
    const response = await fetch(`${MainAPI}/admin/allUsers`, {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data.user;
      });
    console.log(response);
    setRecords(response);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleFilter(event) {
    const newData = records.filter((record) => {
      return record.username
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
    fetchData();
  }

  function handleDelete(id) {
    try {
      axios
        .get(`${MainAPI}/admin/delete/${id}`, {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
          },
        })
        .then((res) => {
          fetchData();
          toast.success(res.data.message);
        });
    } catch (err) {
      console.log(err);
    }
  }

  function handleSubmit(newUser) {
    axios
      .post("http://localhost:4000/admin/create", newUser, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          fetchData();
          setSuccess(true);
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
        setSuccess(false);
      });
  }

  const column = [
    {
      name: "Name",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role_id,
      sortable: true,
    },
    {
      cell: (row) => (
        <div className="action">
          <span
            className="action-btn"
            onClick={() => {
              handleDelete(row.user_id);
            }}
          >
            <DeleteIcon color="red" />
          </span>
          <span
            className="action-btn"
            onClick={() => {
              nav(`/admin/edit/${row.user_id}`);
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
          {/* <div className="search">
            <label>Search: </label>
            <input type="text" onChange={handleFilter}></input>
          </div> */}
          <div className="add">
            <button
              className="btn"
              onClick={() => {
                nav("/admin/create");
              }}
            >
              Add User
            </button>
            {modalOpen && (
              <Modal
                success={success}
                errors={errors}
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
            paginationRowsPerPageOptions={[5, 10]}
            className="table-content"
          />
        </div>
      </div>
    </div>
  );
}
