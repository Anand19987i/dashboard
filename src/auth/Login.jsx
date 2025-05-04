/**
 * Login Component
 * 
 * @file This component handles user authentication with email/password credentials.
 * @description Provides a login form with validation, password visibility toggle, 
 * and integration with application auth context.
 * 
 * Dependencies:
 * - react-router-dom: For navigation
 * - react-hot-toast: For user notifications
 * - lucide-react: For eye icons
 * - AuthContext: For authentication state management
 */

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
    // Navigation hook for post-login redirection
    const navigate = useNavigate();
    
    // Authentication context methods and state
    const { login, isAuthenticated } = useAuth();
    
    // Component state management
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [hidePassword, setHidePassword] = useState(true);

    /**
     * Handles form submission and credential validation
     * @param {React.FormEvent} e - Form event object
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation: Check for empty fields
        if (!credentials.email || !credentials.password) {
            toast.error('All the fields are required');
            return;
        }

        // Validation: Email format check using regex
        if (!/^\S+@\S+\.\S+$/.test(credentials.email)) {
            toast.error('Email format is incorrect');
            return;
        }

        // Validation: Hardcoded credential check (MVP implementation)
        if (credentials.email !== 'admin@example.com' || credentials.password !== 'password123') {
            toast.error('Invalid email or password');
            return; // Added missing return to prevent false login
        }

        // Initiate authentication process
        login(credentials.email, credentials.password);
    };

    /**
     * Toggles password visibility state
     */
    const handlePassword = () => {
        setHidePassword(!hidePassword);
    };

    /**
     * Authentication state watcher
     * Redirects to dashboard upon successful authentication
     */
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
            toast.success('Login Successful');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {/* Login Form Container */}
            <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6 font-nunito">
                    Login to Dashboard
                </h1>

                {/* Login Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Email Input Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            type="email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            placeholder="admin@example.com"
                            autoComplete="username" // Helps password managers
                        />
                    </div>

                    {/* Password Input Field with Visibility Toggle */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                                type={hidePassword ? 'password' : 'text'}
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                placeholder="password123"
                                autoComplete="current-password" // Helps password managers
                            />
                            {/* Password Visibility Toggle Icon */}
                            {hidePassword ? (
                                <EyeIcon 
                                    onClick={handlePassword}
                                    className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                                    aria-label="Show password"
                                />
                            ) : (
                                <EyeOffIcon 
                                    onClick={handlePassword}
                                    className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                                    aria-label="Hide password"
                                />
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 cursor-pointer bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                        aria-label="Login to account"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;