import React from "react";
import NavBarStaff from "../NavBar/NavBarStaff";
import { Route, Routes } from "react-router-dom";
import ConfirmOrder from "../ConfirmOrder/ConfirmOrder";
import ManageVoucher from "../CreateVoucher/ManageVoucher";
import ManageInventory from "../ManageInventory/ManageInventory";
import TrackOrder from "../TrackOrder/TrackOrder";
import ManagePosts from "../ManagePosts/ManagePosts";
import ModalCreatePost from "../ManagePosts/ModalCreatePost/ModalCreatePost";
import EditPost from "../ManagePosts/EditPost/EditPost";
import Report from "../Report/Report";
import ManageUser from "../ManageUser/ManageUser";

export default function StaffManagement() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 col-sm-3">
          <NavBarStaff />
        </div>
        {/* <div className='col-md-1'></div> */}
        <div className="col-md-10 col-sm-9">
          <Routes>
            <Route path="/comfirm_order" element={<ConfirmOrder />} />
            <Route path="/manage_inventory" element={<ManageInventory />} />
            <Route path="/manage_users" element={<ManageUser />} />
            <Route path="/create_voucher_codes" element={<ManageVoucher />} />
            <Route path="/track_orders" element={<TrackOrder />} />
            <Route path="/manage_posts" element={<ManagePosts />} />
            <Route path="/create-post" element={<ModalCreatePost />} />
            <Route path="/report" element={<Report />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
