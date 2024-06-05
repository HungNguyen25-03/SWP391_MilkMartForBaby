import React from 'react'

export default function TrackOrder({ tracks }) {
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
                    {tracks.map((track, index) => (
                        <tr key={index}>
                            <td>{track.orderID}</td>
                            <td>{track.date}</td>
                            <td>{track.cusName}</td>
                            <td>{track.status}</td>
                            <td>{track.amount}</td>
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
