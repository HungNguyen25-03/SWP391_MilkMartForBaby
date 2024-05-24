import React from 'react'
import HeaderPage from './Header/HeaderPage'
import Advertise from './Content/Advertisement/Advertise'
import FooterPage from './Footer/FooterPage'
import Brand from './Content/Brand/Brand'
import UseFull from './Content/Useful/UseFull'
import FillterType from './Content/Shopping/FillterType'


export default function HomeScreen() {
    return (
        <div>
            <HeaderPage />
            <Advertise />
            <Brand />
            <UseFull />
            <FillterType />
            <FooterPage />
        </div>
    )
}
