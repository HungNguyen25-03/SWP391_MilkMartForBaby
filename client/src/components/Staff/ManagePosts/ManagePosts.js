import React, { useEffect, useState } from "react";
import axios from "axios";
import { MainAPI } from "../../API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { DeleteIcon } from "../../../utils/Icon/DeleteIcon";
import { MdModeEdit } from "react-icons/md";
import "./ManagePost.scss";
import { convertSQLDate } from "../../../utils/Format";

export default function ManagePosts() {
  // console.log(description);
  const { auth } = useAuth();
  const nav = useNavigate();
  const [records, setRecords] = useState([]);

  const fetchData = () => {
    axios
      .get(`${MainAPI}/user/show-all-posts`)
      .then((res) => {
        console.log(res.data);
        setRecords(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${MainAPI}/staff/delete-post/${id}`, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const column = [
    {
      name: "Post Id",
      selector: (row) => row.post_id,
      sortable: true,
      center: true,
    },
    {
      name: "Post Title",
      selector: (row) => row.title,
      sortable: true,
      center: true,
    },
    {
      name: "Post date",
      selector: (row) => convertSQLDate(row.post_date),
      sortable: true,
      center: true,
    },
    {
      cell: (row) => (
        <div className="action">
          <span
            className="action-btn"
            onClick={() => {
              handleDelete(row.post_id);
            }}
          >
            <DeleteIcon color="red" />
          </span>
          <Link className="action-btn" to={`/staff/edit-post/${row.post_id}`}>
            <MdModeEdit color="green" />
          </Link>
        </div>
      ),
      center: true,
    },
  ];

  return (
    <>
      <div className="manage-post-container">
        <ToastContainer autoClose={2000} />

        <Link to={"/staff/create-post"} className="create-post-btn">
          Thêm bài
        </Link>

        <div className="table-post mt-3">
          <DataTable
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 8]}
            columns={column}
            data={records}
            className="table-content"
          />
        </div>
      </div>
    </>
  );
}
