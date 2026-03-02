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
      <h2 className="mb-2">Users</h2>

      {/* User Table */}
      <div className="grid grid-cols-[2fr_3fr_1fr_1fr] gap-2 bg-gray-100 p-3 font-semibold border-b">
        <p>Name</p>
        <p>Email</p>
        <p>Role</p>
        <p>Actions</p>
      </div>

      {/* User List */}
      {users.map((user, index) => (
        <div
          key={index}
          className="grid grid-cols-[2fr_3fr_1fr_1fr] gap-2 p-2 border-b"
        >
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.userRole}</p>
          <Link
            to={`/user/${user._id}`}
            className="text-blue-500 hover:underline"
          >
            View User
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Users;
