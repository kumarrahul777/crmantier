import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import DashBoard from "./Components/Dashboard";

import Login from "./Components/LogIn";
import NavBar from "./Components/NavBar";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoute";
import Product from "./Components/Product";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.data.token);
  console.log(isAuthenticated, "isAuthenticated");
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route index element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashBoard" element={<DashBoard />} />
          <Route path="/product" element={<Product />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
