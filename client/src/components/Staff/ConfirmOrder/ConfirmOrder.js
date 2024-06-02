import React from 'react'
import './ConfirmOrder.scss'

export default function ConfirmOrder() {
    return (
        <table>
            <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Action</th>
            </tr>
            <tr>
                <td>001</td>
                <td>2024-06-01</td>
                <td>John Doe</td>
                <td>Confirmed</td>
                <td>$100.00</td>
                <td><button class="action-btn">View</button></td>
            </tr>
        </table>
    )
}
