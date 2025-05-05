/**
 * Settings Page
 *
 * A user settings interface allowing profile updates:
 * - Name
 * - Email
 * - Password & Confirm Password
 *
 * Features:
 * - Form validation
 * - Password visibility toggle
 * - Responsive, accessible, and dark-mode compatible UI
 */

import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Layout from '../components/Layout';
import { useDarkMode } from '../context/DarkModeContext';

const Settings = () => {
  // ---------------- State Management ---------------- //
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { darkMode } = useDarkMode(); // Access dark mode state

  // ---------------- Validation ---------------- //
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- Handlers ---------------- //
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Profile updated successfully!');
    }
  };

  // ---------------- Style Classes ---------------- //
  const containerClasses = `max-w-2xl mx-auto p-8 rounded-2xl shadow-md border mt-6 transition-colors duration-300 ${
    darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-gray-100 text-gray-900'
  }`;

  const inputClasses = `w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:outline-none ${
    darkMode
      ? 'bg-slate-800 text-white border-slate-600 focus:ring-blue-500'
      : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500'
  }`;

  const labelClasses = `block text-sm font-medium mb-1 ${
    darkMode ? 'text-gray-300' : 'text-gray-700'
  }`;

  const errorClasses = 'text-sm text-red-500 mt-1';

  // ---------------- Render ---------------- //
  return (
    <Layout>
      <div className={containerClasses}>
        <h2 className="text-3xl font-semibold mb-8">Account Settings</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ---------- Name and Email Inputs ---------- */}
          {[
            {
              label: 'Full Name',
              name: 'name',
              icon: <FiUser />,
              type: 'text',
              placeholder: 'John Doe'
            },
            {
              label: 'Email Address',
              name: 'email',
              icon: <FiMail />,
              type: 'email',
              placeholder: 'john@example.com'
            }
          ].map((field) => (
            <div key={field.name}>
              <label className={labelClasses}>{field.label}</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {field.icon}
                </div>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={inputClasses}
                />
              </div>
              {errors[field.name] && <p className={errorClasses}>{errors[field.name]}</p>}
            </div>
          ))}

          {/* ---------- Password and Confirm Password ---------- */}
          {[
            {
              label: 'New Password',
              name: 'password',
              value: formData.password,
              show: showPassword,
              setShow: setShowPassword
            },
            {
              label: 'Confirm Password',
              name: 'confirmPassword',
              value: formData.confirmPassword,
              show: showConfirmPassword,
              setShow: setShowConfirmPassword
            }
          ].map(({ label, name, value, show, setShow }) => (
            <div key={name}>
              <label className={labelClasses}>{label}</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiLock />
                </div>
                <input
                  type={show ? 'text' : 'password'}
                  name={name}
                  value={value}
                  onChange={handleChange}
                  placeholder={label}
                  className={`${inputClasses} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {show ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors[name] && <p className={errorClasses}>{errors[name]}</p>}
            </div>
          ))}

          {/* ---------- Submit Button ---------- */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition duration-200 shadow-sm"
          >
            Save Changes
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Settings;
