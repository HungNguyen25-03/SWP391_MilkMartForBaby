import React, { useEffect, useState } from 'react'
import ConfirmOrder from './ConfirmOrder'

export default function GetDetailConfirm() {

    const [dataConfirm, setDataConfirm] = useState()

    useEffect(() => {
        fetch('http://127.0.0.1:1880/confirm_order')
            .then((res) => res.json())
            .then((data) => setDataConfirm(data))
    }, [])

    return (
        <div>
            {dataConfirm && <ConfirmOrder dataConfirm={dataConfirm} />}
        </div>
    )
}
