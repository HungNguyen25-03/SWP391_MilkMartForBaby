import React from 'react'
import './ManageUser.scss'

export default function ManageUser({ users }) {
    return (
        <div className='user'>
            <div className='user-th'>
                <table className='table-user-th'>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className='user-tb'>
                <table className='table-user-tb'>
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
            </div>
        </div>
    )
}
