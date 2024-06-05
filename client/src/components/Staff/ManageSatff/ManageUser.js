import React from 'react'
import '../ConfirmOrder/ConfirmOrder.scss'

export default function ManageUser({ users }) {
    return (
        < >
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.useid}</td>
                            <td>{user.usename}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="action-btn">▪▪▪</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
