import React, { useEffect, useState } from "react";
import "./Inventory.scss";
import { BsJournalCheck } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainAPI } from "../../API";
import { formatVND } from "../../../utils/Format";

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

  const handleActionClick = (index) => {
    setActionVisible(actionVisible === index ? null : index);
  };

  const handleEditProductClick = (product) => {
    setEditProductId(product.product_id);
    console.log(product.product_id);
    setProName(product.product_name);
    setPrice(product.price);
    setStock(product.stock);
    setImg(product.image_url);
    setShowEditProduct(true);
  };

  const handleUpdateProduct = () => {
    if (!editProductId) return;

    console.log(editProductId);

    fetch(`${MainAPI}/staff/update-product/${editProductId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
      },
      body: JSON.stringify({
        product_name: proName,
        image_url: img,
        price: price,
        stock: stock,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update product");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        toast.success("Product updated successfully");
        fetchData();
        setShowEditProduct(false);
        setProName("");
        setPrice("");
        setStock("");
        setImg("");
        setEditProductId(null);
      })
      .catch((error) => console.error("Error updating product:", error));
  };

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

  const handleAddProduct = () => {
    fetch(`${MainAPI}/staff/add-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
      },
      body: JSON.stringify({
        product_name: proName,
        image_url: img,
        price: price,
        stock: stock,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add product");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        fetchData();
        setProName("");
        setPrice("");
        setStock("");
        setImg("");
        setShowAdd(false);
        toast.success("Product added successfully");
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  const handleCancelAddProduct = () => {
    setProName("");
    setPrice("");
    setStock("");
    setImg("");
    setShowAdd(false);
  }
  const handleCancelEditProduct = () => {
    setProName("");
    setPrice("");
    setStock("");
    setImg("");
    setShowEditProduct(false)
  }

  return (
    <div className="inventory">
      <ToastContainer />
      <div className="create-inventory-btn">
        <button className="btn btn-primary"
          style={{
            border: "none",
            borderRadius: "20px",
            marginRight: "20px",
            marginTop: "20px",
          }}
          onClick={() => setShowAdd(true)}
        >
          Add New Product
        </button>
      </div>
      {showAdd && (
        <div className="add-voucher" style={{ marginLeft: "10px" }}>
          <div className="add-voucvher-detail">
            <h4>Add New Product</h4>
            <div>
              <label>Image URL:</label>
              <input
                type="text"
                value={img}
                style={{ width: "80%", marginBottom: '5px' }}
                onChange={(event) => setImg(event.target.value)}
              />
            </div>
            <label>Product Name:</label>
            <input
              type="text"
              value={proName}
              onChange={(event) => setProName(event.target.value)}
            />
            <label style={{ marginLeft: "10px" }}>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            <label style={{ marginLeft: "10px" }}>Stock:</label>
            <input
              type="number"
              value={stock}
              onChange={(event) => setStock(event.target.value)}
            />
            <button className="add-cancel" onClick={handleAddProduct}>
              Add
            </button>
            <button className="add-cancel"
              // onClick={() => setShowAdd(false)}
              onClick={() => handleCancelAddProduct()}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {showEditProduct && (
        <div className="edit-voucher" style={{ marginLeft: "10px" }}>
          <div className="edit-voucvher-detail">
            <h4>Edit Product</h4>
            <div>
              <label>Image URL:</label>
              <input
                type="text"
                value={img}
                style={{ width: "80%", marginBottom: '5px' }}
                onChange={(event) => setImg(event.target.value)}
              />
            </div>
            <label>Product Name:</label>
            <input
              type="text"
              value={proName}
              onChange={(event) => setProName(event.target.value)}
            />
            <label style={{ marginLeft: "10px" }}>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            <label style={{ marginLeft: "10px" }}>Stock:</label>
            <input
              type="number"
              value={stock}
              onChange={(event) => setStock(event.target.value)}
            />
            <button className="add-cancel" onClick={handleUpdateProduct}>
              Update
            </button>
            <button
              className="add-cancel"
              // onClick={() => setShowEditProduct(false)}
              onClick={() => handleCancelEditProduct()}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="inventory-th">
        <table className="table-inventory-th">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>
      </div>

      <div className="inventory-tb">
        <table className="table-inventory-tb">
          <tbody>
            {inventory.map((invent, index) => (
              <tr key={index}>
                <td style={{ padding: "10px" }}>{invent.product_id}</td>
                <td style={{ textAlign: 'center' }}>
                  <div style={{ width: '90px', height: '120px', marginLeft: '9%' }}>
                    <img style={{ width: '100%', height: '100%' }} src={invent.image_url} alt={invent.image_url} />
                  </div>
                </td>
                <td>{invent.product_name}</td>
                <td>{formatVND(invent.price)}</td>
                <td>{invent.stock}</td>
                <td>
                  <button
                    className="action-btn"
                    onClick={() => handleActionClick(index)}
                  >
                    ▪▪▪
                  </button>
                  {actionVisible === index && (
                    <div className="action-menu" style={{ marginTop: '10px' }}>
                      <button className="icon_btn"
                        style={{
                          border: "none",
                          backgroundColor: "none",
                          borderRadius: "20px",
                        }}
                        onClick={() => handleEditProductClick(invent)}
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
                        onClick={() => handleDelete(invent.product_id)}
                      >
                        <MdDeleteOutline color="red" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
