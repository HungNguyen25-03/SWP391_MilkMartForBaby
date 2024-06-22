import React, { useEffect, useState } from 'react'
import ManageInventory from './ManageInventory'
import { MainAPI } from '../../API'

export default function GetInventory() {

    const [inventory, setInventory] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${MainAPI}/staff/product`, {
                    method: "GET"
                })

                if (!res.ok) throw new Error("Failed to fetch data get product");

                const data = await res.json();
                setInventory(data);

            } catch (error) {
                console.error("Error fetching data product:", error);
            }
        }
    }, [])

    return (
        <div>
            {inventory && <ManageInventory inventory={inventory} />}
        </div>
    )
}
