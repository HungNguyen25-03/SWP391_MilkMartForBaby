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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomeScreen />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/admin" element={<NavBar />}></Route>
          <Route path="/blogs" element={<Blog />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/admin/user" element={<UserManagement />}></Route>
          <Route path="/blogs/post/:id" element={<Post />}></Route>
          <Route path="/admin/edit/:id" element={<Edit />}></Route>
          <Route path="/admin/dashboard" element={<Dashboard />}></Route>

          <Route
            path="/home/productdetail/:id"
            element={<ProductDetail />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
