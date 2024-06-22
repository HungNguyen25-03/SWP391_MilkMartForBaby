import React from 'react'
import './Voucher.scss'

export default function ManageVoucher({ vouchers }) {
    return (
        < >
            <table className='table-voucher'>
                <thead>
                    <tr>
                        <th>Voucher ID</th>
                        <th>Code</th>
                        <th>Discount</th>
                    </tr>
                </thead>
                <tbody>
                    {vouchers.map((voucher, index) => (
                        <tr key={index}>
                            <td>{voucher.voucher_id}</td>
                            <td>{voucher.code}</td>
                            <td>{voucher.discount}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
