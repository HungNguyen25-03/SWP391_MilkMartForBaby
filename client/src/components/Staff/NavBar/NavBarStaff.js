import React from 'react'
import { Link } from 'react-router-dom'
import './NavBarStaff.scss'

export default function NavBarStaff() {
    return (
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
    )
}
