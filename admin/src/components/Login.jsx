import React from 'react'
import { useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios'
import { backendUrl } from '../App';

const Login = ({ setToken, setUserRole }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            // make the API call here using normal login Endpoint
            const response = await axios.post(backendUrl + '/api/user/login', { email, password });

            if (response.data.success) {
                const newToken = response.data.token;

                // Fetch user role immediately before letting them through
                try {
                    const meResponse = await axios.get(backendUrl + '/api/user/me', {
                        headers: { token: newToken }
                    });

                    if (meResponse.data.success) {
                        const role = meResponse.data.user.userRole;
                        if (["HOD", "INVENTORY_TO"].includes(role)) {
                            setToken(newToken);
                            if (setUserRole) setUserRole(role);
                            toast.success("Login successful");
                        } else {
                            toast.error("Access denied: Staff only");
                            // Do not set token
                        }
                    } else {
                        toast.error("Failed to verify user profile.");
                    }
                } catch (err) {
                    toast.error("Error fetching user profile.");
                }

            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.error(error.message);

        }
    }
    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                        <input onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                            type="email" placeholder='your@email.com' required />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                            type="password" placeholder='Enter your password' required />
                    </div>
                    <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black hover:scale-105'
                        type='submit'> Login </button>
                </form>
            </div>
        </div>
    )
}

export default Login
