import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const Users = ({ token }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/user/all",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-slate-800 tracking-wide">Users</h2>

      {/* User Table */}
      <div className="grid grid-cols-[2fr_3fr_1fr_1fr] gap-2 bg-slate-50 p-3 font-semibold border border-slate-200 rounded-t-md text-slate-700 tracking-wide">
        <p>Name</p>
        <p>Email</p>
        <p>Role</p>
        <p>Actions</p>
      </div>

      {/* User List */}
      {users.map((user, index) => (
        <div
          key={index}
          className="grid grid-cols-[2fr_3fr_1fr_1fr] gap-2 p-3 border border-slate-200 border-t-0 bg-white hover:bg-slate-50 transition text-sm text-slate-700 items-center"
        >
          <p className="font-medium text-slate-800">{user.name}</p>
          <p>{user.email}</p>
          <p><span className="bg-slate-100 px-2 py-1 rounded-full text-xs font-semibold">{user.userRole}</span></p>
          <Link
            to={`/user/${user._id}`}
            className="text-teal-600 font-medium hover:text-teal-800 hover:underline transition"
          >
            View User
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Users;
