import React from 'react'
import { Link } from 'react-router-dom'
import './NavBarStaff.scss'

export default function NavBarStaff() {
    return (
        <div className='staff'>
            <div className='logo_staff'>
                <img src='https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2FlogoMilk.png?alt=media&token=1bd69b90-459d-45b8-b86a-b0f235f748d9' />
            </div>

            <div className='user_name'>
                <p><span>User Name:</span>&nbsp; Minh Trí</p>
            </div>

            <div className='staff_nav'>
                <div className='staff_playout'>
                    <Link to={'/staff/comfirm_order'}>Confirm Order</Link>
                </div>
                <div className='staff_playout'>
                    <Link to={'/staff/manage_inventory'}>Manage Inventory</Link>
                </div>
                <div className='staff_playout'>
                    <Link to={'/staff/manage_users'}>Manage Users</Link>
                </div>
                <div className='staff_playout'>
                    <Link to={'/staff/create_voucher_codes'}>Create Voucher Codes</Link>
                </div>
                <div className='staff_playout'>
                    <Link to={'/staff/track_orders'}>Track Orders</Link>
                </div>
                <div className='staff_playout'>
                    <Link to={'/staff/manage_posts'}>Confirm Order</Link>
                </div>
            </div>
        </div>
    )
}
