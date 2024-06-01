import "./App.css";
import NavBarAdmin from "./components/Admin/NavBar/NavBarAdmin";
import UserManagement from "./components/Admin/UserManagement/UserManagement";
import Cart from "./components/Cart/Cart";
import HomeScreen from "./components/HomePage/HomeScreen";
import Login from "./components/loginPage/login";
import ProductDetail from "./components/ProductInfo/ProductDetail";
import Register from "./components/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffManagement from "./components/Staff/StaffManagement/StaffManagement";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/admin" element={<NavBarAdmin />}></Route>
          <Route path="/admin/user" element={<UserManagement />}></Route>
          <Route path="/home" element={<HomeScreen />}></Route>
          <Route path="/home/productdetail/:id" element={<ProductDetail />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/staff/*" element={<StaffManagement />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
