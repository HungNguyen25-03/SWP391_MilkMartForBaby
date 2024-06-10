import React from 'react'
import './Voucher.scss'

export default function ManageVoucher({ vouchers }) {
    return (
        < >
            <table className='voucher'>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {vouchers.map((voucher, index) => (
                        <tr key={index}>
                            <td>{voucher.voucherID}</td>
                            <td>{voucher.name}</td>
                            <td>{voucher.discount}</td>
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
