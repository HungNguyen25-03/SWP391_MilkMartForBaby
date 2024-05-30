import "./App.css";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Edit from "./components/Admin/Edit/Edit";

import NavBar from "./components/Admin/NavBar/NavBar";
import UserManagement from "./components/Admin/UserManagement/UserManagement";
import Login from "./components/loginPage/login";
import Register from "./components/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/admin" element={<NavBar />}></Route>
          <Route path="/admin/user" element={<UserManagement />}></Route>
          <Route path="/admin/dashboard" element={<Dashboard />}></Route>
          <Route path="/admin/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
