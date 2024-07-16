import React, { useEffect, useState } from "react";
import "./Voucher.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainAPI } from "../../API";
import { convertSQLDate } from "../../../utils/Format";

export default function ManageVoucher() {
  const [vouchers, setVouchers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [exDate, setExDate] = useState("");
  const [discount, setDiscount] = useState("");

  const fetchData = () => {
    fetch(`${MainAPI}/staff/voucher`, {
      method: "GET",
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data get voucher");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setVouchers(data);
      })
      .catch((error) => {
        console.error("Error fetching data voucher:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddVoucher = () => {
    fetch(`${MainAPI}/staff/createVoucher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
      },
      body: JSON.stringify({
        discount: discount,
        expiration_date: exDate,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          // console.log(res.json());
          return res.json();
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          fetchData();
          setShowAdd(false);
          setExDate("");
          setDiscount("");
          toast.success("Voucher added successfully");
          console.log("Voucher added successfully");
        } else {
          toast.error(data.errors[0].message);
        }
      })
      .catch((error) => {
        console.error("Error adding voucher:", error);
      });
  };

  return (
    <div className="voucher">
      <ToastContainer />
      <div className="create-voucher-btn">
        <button
          style={{
            border: "none",
            borderRadius: "20px",
            marginRight: "20px",
            marginTop: "20px",
            backgroundColor: "#00CCFF",
            marginBottom: "5px",
          }}
          onClick={() => setShowAdd(true)}
        >
          Create Voucher
        </button>
      </div>
      {showAdd && (
        <div className="add-voucher" style={{ marginLeft: "10px" }}>
          <div className="add-voucher-detail">
            <h4>Create Voucher</h4>
            <label className="code-dis">Discount (%):</label>
            <input
              type="number"
              value={discount}
              onChange={(event) => setDiscount(event.target.value)}
            />
            <label>Expiration Date:</label>
            <input
              type="date"
              value={exDate}
              onChange={(event) => setExDate(event.target.value)}
            />
            <button className="add-cancel" onClick={handleAddVoucher}>
              Create
            </button>
            <button className="add-cancel" onClick={() => setShowAdd(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="voucher-th">
        <table className="table-voucher-th">
          <thead>
            <tr>
              <th>Voucher ID</th>
              <th>Code</th>
              <th>Discount</th>
              <th>Expiration_date</th>
            </tr>
          </thead>
        </table>
      </div>

      <div className="voucher-tb">
        <table className="table-voucher-tb">
          <tbody>
            {vouchers.map((voucher, index) => (
              <tr key={index}>
                <td>{voucher.voucher_id}</td>
                <td>{voucher.code}</td>
                <td>{voucher.discount}%</td>
                <td>{convertSQLDate(voucher.expiration_date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
