import React, { useEffect, useState } from 'react'
import ManageInventory from './ManageInventory'
import { MainAPI } from '../../API'

export default function GetInventory() {

    const [inventory, setInventory] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${MainAPI}/staff/order`)
        }
    }, [])

    return (
        <div>
            {inventory && <ManageInventory inventory={inventory} />}
        </div>
    )
}
