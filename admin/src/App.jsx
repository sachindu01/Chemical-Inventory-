import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Request from "./pages/Request";
import { useState } from "react";
import Login from "./components/Login";
import Users from "./pages/Users";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from "./pages/UserProfile";
import Fund from "./pages/Fund";
import StaffRoute from "./components/StaffRoute";
import axios from "axios";


export const backendUrl = import.meta.env.VITE_BACKEND_URL

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token]);

  useEffect(() => {
    // Hydrate user role if token exists on mount or changes
    const fetchRole = async () => {
      if (!token) {
        setUserRole(null);
        return;
      }
      try {
        const response = await axios.get(backendUrl + '/api/user/me', {
          headers: { token }
        });
        if (response.data.success) {
          setUserRole(response.data.user.userRole);
        } else {
          // Token invalid or expired
          setToken("");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.log("Error fetching user role", error);
      }
    };
    fetchRole();
  }, [token]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} setUserRole={setUserRole} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <StaffRoute userRole={userRole} setToken={setToken} setUserRole={setUserRole}>
                <Routes>
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/request" element={<Request token={token} />} />
                  <Route path="/users" element={<Users token={token} />} />
                  <Route path="/user/:id" element={<UserProfile token={token} />} />
                  <Route path="/fundreq" element={<Fund token={token} />} />
                </Routes>
              </StaffRoute>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
