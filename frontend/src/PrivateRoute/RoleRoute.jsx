import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopConext";

const RoleRoute = ({ children, allowedRoles }) => {
    const location = useLocation();
    const { token, userRole, loading } = useContext(ShopContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Not logged in -> go to login
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Logged in, but role is not allowed -> go to Home or Dashboard
    if (userRole && !allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    // Role allows access
    return children;
};

export default RoleRoute;
