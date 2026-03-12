import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import FundForm from "./pages/FundForm";
import InventoryForm from "./pages/InventoryForm";
import About from "./pages/About";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import RoleRoute from "./PrivateRoute/RoleRoute";

const App = () => {
  return (
    <div className="bg-slate-50 min-h-screen px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<RoleRoute allowedRoles={['STUDENT']}><Cart /></RoleRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/fund-form" element={<RoleRoute allowedRoles={['STUDENT']}><FundForm /></RoleRoute>} />
        <Route path="/inventory-form" element={<RoleRoute allowedRoles={['STUDENT']}><InventoryForm /></RoleRoute>} />
        <Route path="/product/:productId" element={<PrivateRoute><Product /></PrivateRoute>} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
