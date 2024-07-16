import React, { useEffect, useState } from "react";
import "./Inventory.scss";
import { BsJournalCheck } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainAPI } from "../../API";
import { formatVND } from "../../../utils/Format";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

export default function ManageInventory() {
  const [inventory, setInventory] = useState([]);
  const [actionVisible, setActionVisible] = useState(null);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [proName, setProName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [img, setImg] = useState("");
  const [editProductId, setEditProductId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const nav = useNavigate();

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

  console.log(inventory);

  // const handleActionClick = (index) => {
  //   setActionVisible(actionVisible === index ? null : index);
  // };

  const handleEditProductClick = (product) => {
    // setEditProductId(product.product_id);
    // console.log(product.product_id);
    // setProName(product.product_name);
    // setPrice(product.price);
    // setStock(product.stock);
    // setImg(product.image_url);
    // setShowEditProduct(true);
    nav(`/edit-product/${product.product_id}`);
  };

  // const handleUpdateProduct = () => {
  //   if (!editProductId) return;

  //   console.log(editProductId);

  //   fetch(`${MainAPI}/staff/update-product/${editProductId}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
  //     },
  //     body: JSON.stringify({
  //       product_name: proName,
  //       image_url: img,
  //       price: price,
  //       stock: stock,
  //     }),
  //   })
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Failed to update product");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       toast.success("Product updated successfully");
  //       fetchData();
  //       setShowEditProduct(false);
  //       setProName("");
  //       setPrice("");
  //       setStock("");
  //       setImg("");
  //       setEditProductId(null);
  //     })
  //     .catch((error) => console.error("Error updating product:", error));
  // };

  const handleDelete = async (productId) => {
    console.log(`Delete product with ID: ${productId}`);
    try {
      const data = await fetch(`${MainAPI}/staff/export/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
        },
      }).then((response) => {
        //   if (!response.ok) throw new Error("Failed to delete product");
        return response.json();
      });
      if (data.status === 200) {
        toast.success("Product deleted successfully");
        fetchData();
      } else {
        toast.error(data.errors[0].message);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleAddProduct = () => {
  //   fetch(`${MainAPI}/staff/add-product`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
  //     },
  //     body: JSON.stringify({
  //       product_name: proName,
  //       image_url: img,
  //       price: price,
  //       stock: stock,
  //     }),
  //   })
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Failed to add product");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       fetchData();
  //       setProName("");
  //       setPrice("");
  //       setStock("");
  //       setImg("");
  //       setShowAdd(false);
  //       toast.success("Product added successfully");
  //     })
  //     .catch((error) => console.error("Error adding product:", error));
  // };

  // const handleCancelAddProduct = () => {
  //   setProName("");
  //   setPrice("");
  //   setStock("");
  //   setImg("");
  //   setShowAdd(false);
  // }
  // const handleCancelEditProduct = () => {
  //   setProName("");
  //   setPrice("");
  //   setStock("");
  //   setImg("");
  //   setShowEditProduct(false)
  // }

  const column = [
    {
      name: "Product ID",
      selector: (row) => row.product_id,
      sortable: true,
    },
    {
      name: "Brand ID",
      selector: (row) => row.brand_id,
      sortable: true,
    },
    {
      name: "Image",
      cell: row => <img src={row.image_url} alt="Product" style={{ width: '50px', height: '50px' }} />,
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Country ID",
      selector: (row) => row.country_id,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Age Range",
      selector: (row) => row.age_range,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      cell: (row) => (
        <div className="action">
          <button className="icon_btn"
            style={{
              border: "none",
              backgroundColor: "none",
              borderRadius: "20px",
            }}
            onClick={() => handleEditProductClick(row)}
          >
            <BsJournalCheck color="green" />
          </button>

          <button className="icon_btn"
            style={{
              border: "none",
              backgroundColor: "none",
              borderRadius: "20px",
              marginLeft: "10px",
              fontSize: "16px",
            }}
            onClick={() => handleDelete(row.product_id)}
          >
            <MdDeleteOutline color="red" />
          </button>
        </div >
      ),
    },
  ];
  console.log(inventory)
  return (
    <>
      <ToastContainer />
      <>
        <div className="manage-inventory-container">
          <div className="table-post mt-3">
            <DataTable
              columns={column}
              data={inventory}
              pagination
              paginationRowsPerPageOptions={[5]}
              className="table-content"
            />
          </div>
        </div>
      </>
    </>
  );
}
