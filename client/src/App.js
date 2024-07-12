import "./App.css";
import Dashboard from "./components/Admin/Dashboard/Dashboard.js";
import Edit from "./components/Admin/Edit/Edit.js";
import NavBar from "./components/Admin/NavBar/NavBar";
import UserManagement from "./components/Admin/UserManagement/UserManagement";
import Blog from "./components/Blog/Blog.js";
import Cart from "./components/Cart/Cart";
import HomeScreen from "./components/HomePage/HomeScreen";
import Login from "./components/loginPage/login";
import Post from "./components/Post/Post.js";
import ProductDetail from "./components/ProductInfo/ProductDetail";
import Register from "./components/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffManagement from "./components/Staff/StaffManagement/StaffManagement.js";
import UserAccount from "./components/UserAccount/UserAccount.js";
import RequireAuth from "./components/RequireAuth.js";
import Unauthorized from "./components/Unauthorized/Unauthorized.js";
import OrderPayment from "./components/OrderPayment/OrderPayment.js";
import SearchPage from "./components/HomePage/Search/SearchPage.js";
import Trackorder from "./components/UserAccount/Sidebar/ScreenCustomerAccount/TrackingOrder/Trackorder.js";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.js";
import ResetPassword from "./components/ForgotPassword/ResetPassword.js";
import BrandPage from "./components/HomePage/Content/Brand/BrandPage.js";
import CreateUser from "./components/Admin/Create/CreateUser.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<HomeScreen />}></Route>
          <Route path="/home" element={<HomeScreen />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/blogs" element={<Blog />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/brand/:brand_name" element={<BrandPage />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/trackorder/:id" element={<Trackorder />}></Route>
          <Route
            path="/home/productdetail/:id"
            element={<ProductDetail />}
          ></Route>
          <Route path="/blogs/post/:id" element={<Post />}></Route>
          <Route path="/unauthorized" element={<Unauthorized />}></Route>

          {/* we want to protect these routes */}
          <Route element={<RequireAuth allowedRoles={"customer"} />}>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/customer-account" element={<UserAccount />}></Route>
            <Route path="/order-payment" element={<OrderPayment />}></Route>
          </Route>

          {/* admin role */}
          <Route element={<RequireAuth allowedRoles={"admin"} />}>
            <Route path="/admin" element={<NavBar />}></Route>
            <Route path="/admin/user" element={<UserManagement />}></Route>
            <Route path="/admin/edit/:id" element={<Edit />}></Route>
            <Route path="/admin/create" element={<CreateUser />}></Route>
            <Route path="/admin/dashboard" element={<Dashboard />}></Route>
          </Route>

          {/* staff */}
          <Route element={<RequireAuth allowedRoles={"staff"} />}>
            <Route path="/staff/*" element={<StaffManagement />}></Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<div>There nothing here</div>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
