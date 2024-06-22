import React, { useEffect, useState } from 'react'
import ManageUser from './ManageUser'
import { MainAPI } from '../../API'

export default function GetManageUser() {
    const [users, setUsers] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${MainAPI}/staff/user`, {
                    method: "GET",
                });

                if (!res.ok) throw new Error("Failed to fetch data get user");

                const data = await res.json();
                setUsers(data);

            } catch (error) {
                console.error("Error fetching data user:", error);
            }
        };

        fetchData();
    }, [])

    return (
        <div>
            {users && <ManageUser users={users} />}
        </div>
    )
}
