import React, { useEffect, useState } from 'react'
import ManageVoucher from './ManageVoucher'
import { MainAPI } from '../../API'

export default function GetVoucher() {
    const [vouchers, setVoucher] = useState()

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await fetch(`${MainAPI}/staff/user`, {
    //                 method: "GET",
    //             });

    //             if (!res.ok) throw new Error("Failed to fetch data get user");

    //             const data = await res.json();
    //             setVoucher(data);

    //         } catch (error) {
    //             console.error("Error fetching data user:", error);
    //         }
    //     }

    //     fetchData();
    // }, [])

    return (
        <div>
            {vouchers && <ManageVoucher vouchers={vouchers} />}
        </div>
    )
}
