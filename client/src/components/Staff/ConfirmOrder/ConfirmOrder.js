import React from 'react'
import './ConfirmOrder.scss'

export default function ConfirmOrder({ dataConfirm }) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Customer Name</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dataConfirm.map((confirm, index) => (
                        <tr key={index}>
                            <td>{confirm.orderID}</td>
                            <td>{confirm.date}</td>
                            <td>{confirm.cusName}</td>
                            <td>{confirm.status}</td>
                            <td>{confirm.amount}</td>
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

