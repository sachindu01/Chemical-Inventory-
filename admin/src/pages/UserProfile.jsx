import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const UserProfile = ({ token }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/user/userid",
        { userId: id },
        { headers: { token } }
      );

      if (response.data.success) {
        setUser(response.data.user);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const handleRoleChange = async (event, userId) => {
    const newRole = event.target.value;

    try {
      const response = await axios.post(
        backendUrl + "/api/user/role/userid",
        { userId, userRole: newRole },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchUser();
        toast.success("Role updated successfully!");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/user/delete",
        { userId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("User deleted successfully!");
        navigate("/users");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  return user ? (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          {user.name}'s Profile
        </h2>
        <p className="text-gray-600 mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-600">
          <strong>Role:</strong> {user.userRole}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Role Change Section */}
        <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Change User Role
          </h3>

          <select
            value={user.userRole}
            onChange={(e) => handleRoleChange(e, user._id)}
            className="block w-full p-2 border border-gray-300 rounded-md mb-4"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="inventory manager">Inventory Manager</option>
          </select>
        </div>

        {/* Delete User Section */}
        <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Delete {user.name}
          </h3>
          <button
            onClick={() => handleDeleteUser(user._id)}
            className={`w-full py-2 px-4 bg-red-700 text-white rounded-md hover:bg-red-700 transition duration-200 `}
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-500">No user found</p>
  );
};

export default UserProfile;
