import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu } from 'lucide-react';

/**
 * Navbar Component
 * 
 * Displays a top navigation bar with app branding, a toggle menu button for small screens,
 * and user information (email).
 */
const Navbar = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 max-w-screen-2xl mx-auto">
        
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-4">
          {/* Sidebar toggle (visible only on small screens) */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
            aria-label="Toggle Sidebar"
          >
            <Menu size={22} />
          </button>

          {/* Brand Name */}
          <h1 className="text-xl font-semibold text-gray-800 tracking-tight">MVP Dashboard</h1>
        </div>

        {/* Right: User Email */}
        <div className="text-sm text-gray-600 truncate max-w-[200px] sm:max-w-none">
          {user?.email ?? 'Guest'}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
