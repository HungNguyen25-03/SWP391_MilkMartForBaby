import React, { useEffect, useState } from "react";
import "./Inventory.scss";
import { BsJournalCheck } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainAPI } from "../../API";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { MdOutlineInventory } from "react-icons/md";

export default function ManageInventory() {
  const [inventory, setInventory] = useState([]);
  const nav = useNavigate();
  const [showModal, setShowModal] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState(null);
  const [proDate, setProDate] = useState("");
  const [expDate, setExpDate] = useState("");
  const [quantity, setQuantity] = useState("");

  const fetchData = () => {
    fetch(`${MainAPI}/staff/product`, {
      method: "GET",
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data get product");
        return res.json();
      })
      .then((data) => setInventory(data))
      .catch((error) => console.error("Error fetching data product:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditProductClick = (product) => {
    nav(`/edit-product/${product.product_id}`);
  };


  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item ?"
    );

    if (confirmed) {
      handleConfirmDelete(id)
    };
  }

  const handleConfirmDelete = async (productId) => {
    try {
      const data = await fetch(`${MainAPI}/staff/export/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
        },
      }).then((response) => response.json());

      if (data.status === 200) {
        toast.success("Product deleted successfully");
        fetchData();
      } else {
        toast.error(data.errors[0].message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditDetail = (product) => {
    setShowModal(true);
    setProDate(product.production_date);
    setExpDate(product.expiry_date);
    setQuantity(product.stock);
    console.log(product)
  }

  const columns = [
    {
      name: "Product ID",
      selector: (row) => row.product_id,
      sortable: true,
      center: true,
      wrap: true,
      style: {
        fontSize: '12px', textAlign: 'center'
      },
    },
    {
      name: "Brand",
      selector: (row) => row.brand_name,
      sortable: true,
      center: true,
      wrap: true,
      style: { fontSize: '12px', textAlign: 'center' },
    },
    {
      name: "Image",
      cell: (row) => <img src={row.image_url} alt="Product" style={{ width: '55px', height: '70px' }} />,
      center: true,
    },
    {
      name: "Product",
      selector: (row) => row.product_name,
      sortable: true,
      center: true,
      wrap: true,
      style: { fontSize: '12px', textAlign: 'center' },
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      center: true,
      style: { fontSize: '12px', textAlign: 'center' },
    },
    {
      name: "Country ID",
      selector: (row) => row.country_id,
      sortable: true,
      center: true,
      style: { fontSize: '12px', textAlign: 'center' },
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      center: true,
      wrap: true,
      style: { fontSize: '12px', textAlign: 'center' },
    },
    {
      name: "Age Range",
      selector: (row) => row.age_range,
      sortable: true,
      center: true,
      wrap: true,
      style: { fontSize: '12px', textAlign: 'center' },
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
      center: true,
      style: { fontSize: '12px', textAlign: 'center' },
    },
    {
      cell: (row) => (
        <div className="action">
          <button className="icon_btn" onClick={() => handleEditProductClick(row)}>
            <BsJournalCheck color="green" />
          </button>
          <button className="icon_btn" onClick={() => handleDelete(row.product_id)}>
            <MdDeleteOutline color="red" fontSize="16px" />
          </button>
          {/* <button className="icon_btn" onClick={() => { setShowModal(true); setSelectedProduct(row); }}> */}
          <button className="icon_btn" onClick={() => handleEditDetail(row)}>
            <MdOutlineInventory color="#0066cc" fontSize="16px" />
          </button>
        </div>
      ),
      center: true,
    },
  ];

  console.log(showModal)

  console.log(inventory)

  return (
    <>
      <ToastContainer />
      <div className="manage-inventory-container">
        <button
          className="btn btn-primary"
          onClick={() => {
            nav("/create-product");
          }}
        >
          Add Product
        </button>
        <div className="table-post">
          {
            showModal && (
              <>
                <div>
                  <input type="date" value={proDate} onChange={(e) => setProDate(e.target.value)} />
                  <input type="date" value={expDate} onChange={(e) => setExpDate(e.target.value)} />
                  <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
              </>
            )
          }
          <DataTable
            pagination
            paginationPerPage={4}
            paginationRowsPerPageOptions={[4, 6]}
            columns={columns}
            data={inventory}
            className="table-content"
          />
        </div>
      </div>
    </>
  );
}
