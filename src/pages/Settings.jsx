import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Layout from '../components/Layout';

/**
 * Settings Page
 *
 * Allows users to update their account settings, including:
 * - Full name
 * - Email address
 * - Password and confirmation
 *
 * Includes client-side validation, responsive UI, and user feedback.
 */

const Settings = () => {
  // ------------------ State ------------------ //
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ------------------ Validation ------------------ //
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

  // ------------------ Form Handlers ------------------ //
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Profile updated successfully!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error if present
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // ------------------ Render ------------------ //
  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-100 mt-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Account Settings</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* -------- Text Inputs: Name & Email -------- */}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>

              <div className="relative">
                {/* Left Icon */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {field.icon}
                </div>

                {/* Input Field */}
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Validation Error */}
              {errors[field.name] && (
                <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}

          {/* -------- Password Inputs: New & Confirm -------- */}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>

              <div className="relative">
                {/* Lock Icon */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FiLock />
                </div>

                {/* Password Input */}
                <input
                  type={show ? 'text' : 'password'}
                  name={name}
                  value={value}
                  onChange={handleChange}
                  placeholder={label}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                {/* Toggle Visibility */}
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {show ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Validation Error */}
              {errors[name] && (
                <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          {/* -------- Submit Button -------- */}
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
