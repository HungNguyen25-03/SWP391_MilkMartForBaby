import React, { useEffect, useState } from 'react'
import ManageVoucher from './ManageVoucher'

export default function GetVoucher() {
    const [vouchers, setVoucher] = useState()

    useEffect(() => {
        fetch('http://127.0.0.1:1880/voucher')
            .then((res) => res.json())
            .then((date) => setVoucher(date))
    }, [])

    console.log(vouchers)

    return (
        <div>
            {vouchers && <ManageVoucher vouchers={vouchers} />}
        </div>
    )
}
