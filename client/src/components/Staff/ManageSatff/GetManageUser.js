import React, { useEffect, useState } from 'react'
import ManageUser from './ManageUser'

export default function GetManageStaff() {

    const [users, setUsers] = useState()

    useEffect(() => {
        fetch('http://127.0.0.1:1880/managestaff')
            .then((res) => res.json())
            .then((date) => setUsers(date))
    }, [])

    return (
        <div>
            {users && <ManageUser users={users} />}
        </div>
    )
}
