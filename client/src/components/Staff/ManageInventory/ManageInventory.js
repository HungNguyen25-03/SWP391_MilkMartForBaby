import React from 'react'
import './Inventory.scss'

export default function ManageInventory({ inventory }) {


    return (
        <>
            <table className='table-inventory'>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((invent, index) => (
                        <tr key={index}>
                            <td>{invent.product_id}</td>
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
        </>
    )
}
