import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NavBarStaff.scss'

export default function NavBarStaff() {

    // const navigate = useNavigate();

    // useEffect(() => {
    //     navigate('/staff/comfirm_order'); // Redirect to the desired path
    // }, [navigate]);

    return (
        <div className='staff'>
            <div className='logo_staff'>
                <img src='https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Flogo.png?alt=media&token=608fc814-b3d6-463b-845b-3c64b92cc563' />
            </div>

            <div className='user_name'>
                <p><span>User Name:</span>&nbsp; Minh Trí</p>
            </div>

            <div className='line'></div>

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
                    <Link to={'/staff/manage_posts'}>Manage Posts</Link>
                </div>
            </div>
        </div>
    )
}
