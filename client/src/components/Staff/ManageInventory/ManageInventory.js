import React, { useEffect, useState } from 'react';
import './Inventory.scss';
import { BsJournalCheck } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { MainAPI } from '../../API';

export default function ManageInventory() {
    const [inventory, setInventory] = useState([]);
    const [actionVisible, setActionVisible] = useState(null);
    const [proName, setProName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
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

    const handleUpdate = (productId) => {
        console.log(`Update product with ID: ${productId}`);
    };

    const handleDelete = (productId) => {
        console.log(`Delete product with ID: ${productId}`);
    };

    const handleAddProduct = () => {
        const newProduct = {
            product_name: proName,
            price: parseFloat(price),
            stock: parseInt(stock),
        };

        fetch(`${MainAPI}/staff/product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": JSON.parse(localStorage.getItem("accessToken"))
            },
            body: JSON.stringify(newProduct),
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to add product");
                return res.json();
            })
            .then(data => {
                setInventory([...inventory, data]);
                setShowAdd(false);
                setProName('');
                setPrice('');
                setStock('');
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
                        <button className='add-cancel' onClick={handleAddProduct}>Create</button>
                        <button className='add-cancel' onClick={() => setShowAdd(false)}>Cancel</button>
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
                                                onClick={() => handleUpdate(invent.product_id)}
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
