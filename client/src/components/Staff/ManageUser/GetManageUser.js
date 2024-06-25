import React, { useEffect, useState } from 'react';
import ManageUser from './ManageUser';
import { MainAPI } from '../../API';

export default function GetManageUser() {
    const [users, setUsers] = useState();

    useEffect(() => {
        const fetchData = () => {
            fetch(`${MainAPI}/staff/user`, {
                method: "GET",
                headers: { "x-access-token": JSON.parse(localStorage.getItem("accessToken")) }
            })
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch data get user");
                    return res.json();
                })
                .then(data => setUsers(data))
                .catch(error => console.error("Error fetching data user:", error));
        };

        fetchData();
    }, []);

    return (
        <div>
            {users && <ManageUser users={users} />}
        </div>
    );
}
