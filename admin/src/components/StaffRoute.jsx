import React from 'react'
import Unauthorized from '../pages/Unauthorized';

const StaffRoute = ({ children, userRole, setToken, setUserRole }) => {
    const allowedRoles = ["HOD", "INVENTORY_TO"];

    if (!userRole) {
        return <div>Loading access...</div>;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Unauthorized setToken={setToken} setUserRole={setUserRole} />;
    }

    return children;
}

export default StaffRoute
