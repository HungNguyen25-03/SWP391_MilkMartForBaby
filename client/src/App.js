import "./App.css";
import HomeScreen from "./components/HomePage/HomeScreen";
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
          <Route path="/home" element={<HomeScreen />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;