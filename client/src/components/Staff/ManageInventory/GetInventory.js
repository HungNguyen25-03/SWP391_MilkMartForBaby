import React, { useEffect, useState } from 'react'
import ManageInventory from './ManageInventory'

export default function GetInentory() {

    const [inventory, setInventory] = useState()

    useEffect(() => {
        fetch("http://127.0.0.1:1880/inventory")
            .then((res) => res.json())
            .then((data) => setInventory(data))
    }, [])

    return (
        <div>
            {inventory && <ManageInventory inventory={inventory} />}
        </div>
    )
}
