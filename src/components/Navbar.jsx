import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

/**
 * Navbar Component
 * 
 * Displays a top navigation bar with app branding, a toggle menu button for small screens,
 * and user information (email).
 */
const Navbar = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const { darkMode } = useDarkMode();

  return (
    <header className={`w-full shadow-sm sticky top-0 z-30 ${darkMode ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-black'}`}>
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 max-w-screen-2xl mx-auto">
        
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-4">
          {/* Sidebar toggle (visible only on small screens) */}
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden md:hidden ${darkMode ? 'text-white': 'text-gray-800'}`}
            aria-label="Toggle Sidebar"
          >
            <Menu size={22} />
          </button>

          {/* Brand Name */}
          <h1 className={`text-xl font-semibold tracking-tight ${darkMode ? 'text-white' : 'text-gray-800'}`}>MVP Dashboard</h1>
        </div>

        {/* Right: User Email */}
        <div className={`text-sm truncate max-w-[200px] sm:max-w-none ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {user?.email ?? 'Guest'}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
