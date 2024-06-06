import React from 'react'
import NavBarStaff from '../NavBar/NavBarStaff'
import { Route, Routes } from 'react-router-dom'
import GetDetailConfirm from '../ConfirmOrder/GetDetailConfirm'
import GetInentory from '../ManageInventory/GetInventory'
import GetManageStaff from '../ManageSatff/GetManageUser'
import GetVoucher from '../CreateVoucher/GetVoucher'
import GetTrackOrder from '../TrackOrder/GetTrackOrder'

export default function StaffManagement() {
    return (
        <div style={{ display: 'flex' }}>
            <NavBarStaff />
            <Routes>
                <Route path='/comfirm_order' element={<GetDetailConfirm />}></Route>
                <Route path='/manage_inventory' element={<GetInentory />}></Route>
                <Route path='/manage_users' element={<GetManageStaff />}></Route>
                <Route path='/create_voucher_codes' element={<GetVoucher />}></Route>
                <Route path='/track_orders' element={<GetTrackOrder />}></Route>
                {/*<Route path='/comfirm_order' element={<ConfirmOrder />}></Route> */}
            </Routes>
        </div>
    )
}
