// import React, { useEffect, useState } from 'react';
// import { FaWindowClose } from "react-icons/fa";
// import { IoMdCheckbox } from "react-icons/io";
// import './ConfirmOrder.scss';
// import { MainAPI } from '../../API';

// export default function ConfirmOrder() {

//     const getStatusClass = (status) => {
//         if (!status) return '';
//         switch (status.toLowerCase()) {
//             case 'cancel':
//                 return 'status-cancel';
//             case 'completed':
//                 return 'status-complete';
//             case 'pending':
//                 return 'status-pending';
//             case 'complete':
//                 return 'status-delivery'; // Sửa từ 'delevery' thành 'delivery'
//             case 'confirm':
//                 return 'status-confirm';
//             default:
//                 return '';
//         }
//     };

//     const checkStatusIsPending = (status) => {
//         if (!status) return false;
//         return status.toLowerCase() === 'pending';
//     };

//     const [dataConfirm, setDataConfirm] = useState([]);

//     const fetchData = async () => {
//         try {
//             const response = await fetch(`${MainAPI}/staff/order`, {
//                 method: "GET",
//             });

//             if (!response.ok) throw new Error("Failed to fetch data get order");

//             const data = await response.json();
//             setDataConfirm(data);
//         } catch (error) {
//             console.error("Error fetching data order:", error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []); // Dependency array rỗng để fetch dữ liệu chỉ một lần

//     const handleSetCancel = (confirm) => {
//         const cancelConfirm = async () => {
//             try {
//                 const response = await fetch(`${MainAPI}/staff/cancel`, {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ order_id: confirm.order_id }),
//                 });

//                 if (!response.ok) throw new Error("Failed to cancel order");

//                 const data = await response.json();
//                 setDataConfirm(prevData => prevData.map(item => item.order_id === confirm.order_id ? { ...item, status: data.status } : item));
//             } catch (error) {
//                 console.error("Error canceling order:", error);
//             }
//         };

//         cancelConfirm();
//     };

//     return (
//         <div className='confirm'>
//             <div className='confirm-th'>
//                 <table className='table-confirm-th'>
//                     <thead>
//                         <tr>
//                             <th>Order ID</th>
//                             <th>Date</th>
//                             <th>Customer Name</th>
//                             <th>Status</th>
//                             <th>Amount</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                 </table>
//             </div>

//             <div className='confirm-tb'>
//                 <table className='table-confirm-tb'>
//                     <tbody>
//                         {dataConfirm.map((confirm) => (
//                             <tr key={confirm.order_id}>
//                                 <td>{confirm.order_id}</td>
//                                 <td>{confirm.order_date}</td>
//                                 <td>{confirm.username}</td>
//                                 <td className={getStatusClass(confirm.status)}>
//                                     <span className="status-dot"></span>
//                                     {confirm.status}
//                                 </td>
//                                 <td>{confirm.total_amount} đ</td>
//                                 {checkStatusIsPending(confirm.status) ?
//                                     <td>
//                                         <button className="action-btn"><IoMdCheckbox color='green' size='25px' /></button>
//                                         <button className="action-btn" onClick={() => handleSetCancel(confirm)}><FaWindowClose color='red' size='22px' /></button>
//                                     </td>
//                                     :
//                                     <td></td>
//                                 }
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div >
//     );
// }


import React, { useEffect, useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import { IoMdCheckbox } from "react-icons/io";
import './ConfirmOrder.scss';
import { MainAPI } from '../../API';

export default function ConfirmOrder() {

    const getStatusClass = (status) => {
        if (!status) return '';
        switch (status.toLowerCase()) {
            case 'cancel':
                return 'status-cancel';
            case 'completed':
                return 'status-complete';
            case 'pending':
                return 'status-pending';
            case 'complete':
                return 'status-delivery'; // Sửa từ 'delevery' thành 'delivery'
            case 'confirm':
                return 'status-confirm';
            default:
                return '';
        }
    };

    const checkStatusIsPending = (status) => {
        if (!status) return false;
        return status.toLowerCase() === 'pending';
    };

    const [dataConfirm, setDataConfirm] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${MainAPI}/staff/order`, {
                method: "GET",
            });

            if (!response.ok) throw new Error("Failed to fetch data get order");

            const data = await response.json();
            setDataConfirm(data);
        } catch (error) {
            console.error("Error fetching data order:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [dataConfirm]);

    const handleSetCancel = (confirm) => {
        const cancelConfirm = async () => {
            try {
                const response = await fetch(`${MainAPI}/staff/cancel`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ order_id: confirm.order_id }),
                });

                if (!response.ok) throw new Error("Failed to cancel order");

                const data = await response.json();
                setDataConfirm(prevData => prevData.map(item => item.order_id === confirm.order_id ? { ...item, status: data.status } : item));
            } catch (error) {
                console.error("Error canceling order:", error);
            }
        };

        cancelConfirm();
    };

    const handleSetConfirm = (confirm) => {
        const Confirm = async () => {
            try {
                const response = await fetch(`${MainAPI}/staff/confirm`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ order_id: confirm.order_id }),
                });

                if (!response.ok) throw new Error("Failed to confirm order");

                const data = await response.json();
                setDataConfirm(prevData => prevData.map(item => item.order_id === confirm.order_id ? { ...item, status: data.status } : item));
            } catch (error) {
                console.error("Error confirm order:", error);
            }
        };

        Confirm();
    };

    return (
        <div className='confirm'>
            <div className='confirm-th'>
                <table className='table-confirm-th'>
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
                </table>
            </div>

            <div className='confirm-tb'>
                <table className='table-confirm-tb'>
                    <tbody>
                        {dataConfirm.map((confirm) => (
                            <tr key={confirm.order_id}>
                                <td>{confirm.order_id}</td>
                                <td>{confirm.order_date}</td>
                                <td>{confirm.username}</td>
                                <td className={getStatusClass(confirm.status)}>
                                    <span className="status-dot"></span>
                                    {confirm.status}
                                </td>
                                <td>{confirm.total_amount} đ</td>
                                {checkStatusIsPending(confirm.status) ?
                                    <td>
                                        <button className="action-btn" onClick={() => handleSetConfirm(confirm)}><IoMdCheckbox color='green' size='25px' /></button>
                                        <button className="action-btn" onClick={() => handleSetCancel(confirm)}><FaWindowClose color='red' size='22px' /></button>
                                    </td>
                                    :
                                    <td></td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}
