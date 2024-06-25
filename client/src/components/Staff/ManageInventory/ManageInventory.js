import React, { useEffect, useState } from 'react';
import './Inventory.scss';
import { BsJournalCheck } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { MainAPI } from '../../API';

export default function ManageInventory() {
    const [inventory, setInventory] = useState([]);
    const [actionVisible, setActionVisible] = useState(null);
    const [showEditProduct, setShowEditProduct] = useState(false);
    const [proName, setProName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [editProductId, setEditProductId] = useState(null);
    const [showAdd, setShowAdd] = useState(false);

    const fetchData = () => {
        fetch(`${MainAPI}/staff/product`, {
            method: "GET",
            headers: { "x-access-token": JSON.parse(localStorage.getItem("accessToken")) }
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch data get product");
                return res.json();
            })
            .then(data => setInventory(data))
            .catch(error => console.error("Error fetching data product:", error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleActionClick = (index) => {
        setActionVisible(actionVisible === index ? null : index);
    };

    const handleEditProductClick = (product) => {
        setEditProductId(product.product_id);
        console.log(product.product_id)
        setProName(product.product_name);
        setPrice(product.price);
        setStock(product.stock);
        setShowEditProduct(true);
    };

    const handleUpdateProduct = () => {
        if (!editProductId) return;

        console.log(editProductId)

        fetch(`${MainAPI}/staff/update-product/${editProductId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": JSON.parse(localStorage.getItem("accessToken"))
            },
            body: JSON.stringify({
                product_name: proName,
                price: price,
                stock: stock,
            }),
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to update product");
                return res.json();
            })
            .then(data => {
                console.log(data);
                fetchData();
                setShowEditProduct(false);
                setProName('');
                setPrice('');
                setStock('');
                setEditProductId(null);
            })
            .catch(error => console.error("Error updating product:", error));
    };

    const handleDelete = (productId) => {
        console.log(`Delete product with ID: ${productId}`);
        fetch(`${MainAPI}/staff/export/${productId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": JSON.parse(localStorage.getItem("accessToken"))
            },
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to delete product");
                return response.json();
            })
            .then(data => {
                console.log(data);
                fetchData();
            })
            .catch(error => console.error("Error deleting product:", error));
    };

    const handleAddProduct = () => {
        fetch(`${MainAPI}/staff/add-product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": JSON.parse(localStorage.getItem("accessToken"))
            },
            body: JSON.stringify({
                product_name: proName,
                price: price,
                stock: stock,
            }),
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to add product");
                return res.json();
            })
            .then(data => {
                console.log(data);
                fetchData();
                setProName('');
                setPrice('');
                setStock('');
                setShowAdd(false);
            })
            .catch(error => console.error("Error adding product:", error));
    };

    return (
        <div className='inventory'>
            <div className="create-inventory-btn">
                <button
                    style={{ border: 'none', borderRadius: '20px', marginRight: '20px', marginTop: '20px', backgroundColor: '#00CCFF' }}
                    onClick={() => setShowAdd(true)}>
                    Add New Product
                </button>
            </div>
            {showAdd && (
                <div className="add-voucher" style={{ marginLeft: '10px' }}>
                    <div className="add-voucvher-detail">
                        <h4>Add New Product</h4>
                        <label>Product Name:</label>
                        <input type="text" value={proName} onChange={(event) => setProName(event.target.value)} />
                        <label style={{ marginLeft: '10px' }}>Price:</label>
                        <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} />
                        <label style={{ marginLeft: '10px' }}>Stock:</label>
                        <input type="number" value={stock} onChange={(event) => setStock(event.target.value)} />
                        <button className='add-cancel' onClick={handleAddProduct}>Add</button>
                        <button className='add-cancel' onClick={() => setShowAdd(false)}>Cancel</button>
                    </div>
                </div>
            )}
            {showEditProduct && (
                <div className="edit-voucher" style={{ marginLeft: '10px' }}>
                    <div className="edit-voucvher-detail">
                        <h4>Edit Product</h4>
                        <label>Product Name:</label>
                        <input type="text" value={proName} onChange={(event) => setProName(event.target.value)} />
                        <label style={{ marginLeft: '10px' }}>Price:</label>
                        <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} />
                        <label style={{ marginLeft: '10px' }}>Stock:</label>
                        <input type="number" value={stock} onChange={(event) => setStock(event.target.value)} />
                        <button className='add-cancel' onClick={handleUpdateProduct}>Update</button>
                        <button className='add-cancel' onClick={() => setShowEditProduct(false)}>Cancel</button>
                    </div>
                </div>
            )}
            <div className='inventory-th'>
                <table className='table-inventory-th'>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className='inventory-tb'>
                <table className='table-inventory-tb'>
                    <tbody>
                        {inventory.map((invent, index) => (
                            <tr key={index}>
                                <td style={{ padding: "10px" }}>{invent.product_id}</td>
                                <td>{invent.product_name}</td>
                                <td>{invent.price} đ</td>
                                <td>{invent.stock}</td>
                                <td>
                                    <button className="action-btn" onClick={() => handleActionClick(index)}>
                                        ▪▪▪
                                    </button>
                                    {actionVisible === index && (
                                        <div className="action-menu">
                                            <button
                                                style={{ border: 'none', backgroundColor: 'none', borderRadius: '20px' }}
                                                onClick={() => handleEditProductClick(invent)}
                                            >
                                                <BsJournalCheck color='green' />
                                            </button>

                                            <button
                                                style={{ border: 'none', backgroundColor: 'none', borderRadius: '20px', marginLeft: '10px', fontSize: '16px' }}
                                                onClick={() => handleDelete(invent.product_id)}
                                            >
                                                <MdDeleteOutline color='red' />
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
