import React from 'react'
import NavBarStaff from '../NavBar/NavBarStaff'
import { Route, Routes } from 'react-router-dom'
import ConfirmOrder from '../ConfirmOrder/ConfirmOrder'
import GetDetailConfirm from '../ConfirmOrder/GetDetailConfirm'
import GetInentory from '../ManageInventory/GetInventory'

export default function StaffManagement() {
    return (
        <div style={{ display: 'flex' }}>
            <NavBarStaff />
            <Routes>
                <Route path='/comfirm_order' element={<GetDetailConfirm />}></Route>
                <Route path='/manage_inventory' element={<GetInentory />}></Route>
                {/* <Route path='/comfirm_order' element={<ConfirmOrder />}></Route>
                <Route path='/comfirm_order' element={<ConfirmOrder />}></Route>
                <Route path='/comfirm_order' element={<ConfirmOrder />}></Route>
                <Route path='/comfirm_order' element={<ConfirmOrder />}></Route> */}
            </Routes>
        </div>
    )
}
