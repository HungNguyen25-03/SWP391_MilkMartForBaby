import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import './HeaderPage.scss';

export default function HeaderPage() {
    return (
        <div className='header'>

            <div className='logo'>
                <img src='assest/images/logo/logo.png' />
            </div>


            <div className='search'>
                <input type='text' placeholder='Search...' />
            </div>

            <div className='other_header'>
                <Link to='/cart' className='cart'>
                    <div className='cart_icon'><FaShoppingCart /></div>
                    <div className='detail'>Cart</div>
                </Link>

                <Link to='/acccount' className='acc'>
                    <div className='acc_icon'><FaUser /></div>
                    <div className='detail'>My Account</div>
                </Link>
            </div>
        </div>
    )
}
