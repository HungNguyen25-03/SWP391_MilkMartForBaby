import React, { useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import { IoMdCheckbox } from "react-icons/io";
import './ConfirmOrder.scss';

export default function ConfirmOrder({ dataConfirm }) {

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'cancel':
                return 'status-cancel';
            case 'completed':
                return 'status-complete';
            case 'pending':
                return 'status-pending';
            case 'complete':
                return 'status-delevery';
            case 'confirm':
                return 'status-confirm';
            default:
                return '';
        }
    };

    const checkStatusIsPending = (status) => {
        if (status.toLowerCase() === 'pending') {
            return true
        }
    }

    return (
        <>
            <table className='table_confirm'>
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
                            <td>{confirm.order_id}</td>
                            <td>{confirm.order_date}</td>
                            <td>{confirm.username}</td>
                            <td className={getStatusClass(confirm.status)}>
                                <span className="status-dot"></span>
                                {confirm.status}
                            </td>
                            <td>{confirm.total_amount} đ</td>
                            {checkStatusIsPending(confirm.status) === true ?
                                <td>
                                    <button className="action-btn"><IoMdCheckbox color='green' size='25px' /></button>
                                    <button className="action-btn"><FaWindowClose color='red' size='22px' /></button>
                                </td>
                                :
                                <td></td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
