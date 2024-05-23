import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import './HeaderPage.scss'

export default function HeaderPage() {
    return (
        <div className='header'>

            <div className='logo'>
                <img src='assest/images/logo/logo.png' />
            </div>


            <div className='search'>
                <input type='text' placeholder='Search...' />
            </div>

            <div className='other'>
                <div className='cart'><FaShoppingCart /> &nbsp; Cart</div>
                <div className='acc'><FaUser />&nbsp; My Accopunt</div>
            </div>
        </div>
    )
}
