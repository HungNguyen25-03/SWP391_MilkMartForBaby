import React from 'react'
import './Voucher.scss'

export default function ManageVoucher({ vouchers }) {
    return (
        <div className='voucher'>
            <div className='voucher-th'>
                <table className='table-voucher-th'>
                    <thead>
                        <tr>
                            <th>Voucher ID</th>
                            <th>Code</th>
                            <th>Discount</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className='voucher-tb'>
                <table className='table-voucher-tb'>
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
            </div>
        </div >
    )
}