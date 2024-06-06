import React from 'react'
import HeaderPage from '../../utils/Header/Header'
import Advertise from './Content/Advertisement/Advertise'
import FooterPage from '../../utils/Footer/FooterPage'
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
  );
}
