import React from 'react'

const Unauthorized = ({ setToken, setUserRole }) => {
    const handleBackToLogin = () => {
        localStorage.removeItem("token");
        setToken("");
        if (setUserRole) setUserRole("");
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full bg-yellow-50'>
            <div className='bg-white shadow-md rounded-lg px-8 py-10 max-w-md text-center'>
                <h1 className='text-3xl font-bold mb-4 text-red-600'>Unauthorized</h1>
                <p className='text-gray-600 mb-8'>Access Denied: You must be a Staff member (HOD or INVENTORY_TO) to view this system.</p>
                <button
                    onClick={handleBackToLogin}
                    className='w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-800 transition-colors'
                >
                    Back to Login
                </button>
            </div>
        </div>
    )
}

export default Unauthorized
