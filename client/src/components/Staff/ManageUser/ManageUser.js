import React from 'react'
import './ManageUser.scss'

export default function ManageUser({ users }) {
    return (
        < >
            <table className='table_manageuser'>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.user_id}</td>
                            <td>{user.username}</td>
                            <td>{user.role_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
