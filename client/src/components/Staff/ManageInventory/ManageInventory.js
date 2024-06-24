import React from 'react'
import './Inventory.scss'

export default function ManageInventory({ inventory }) {


    return (
        <div className='inventory'>
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
                                    <button className="action-btn">▪▪▪</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
