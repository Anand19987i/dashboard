/**
 * Sidebar Navigation Component
 *
 * A responsive, accessible, and theme-aware sidebar for navigation.
 *
 * Features:
 * - Toggleable via parent control
 * - Active route styling
 * - Dark mode toggle
 * - Mobile overlay handling
 * - Outside click detection
 */

import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  X,
  LayoutDashboard,
  Users,
  Settings,
  Moon,
  Sun
} from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = useRef();
  const { darkMode, toggleDarkMode } = useDarkMode();

  // List of navigation routes
  const navItems = [
    { path: '/', name: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/users', name: 'Users', icon: <Users className="w-5 h-5" /> },
    { path: '/settings', name: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ];

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        toggleSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, toggleSidebar]);

  return (
    <>
      {/* Mobile overlay when sidebar is open */}
      {isOpen && (
        <div className={`fixed inset-0 z-40 backdrop-blur-sm md:hidden max-[850px]:hidden ${darkMode ? 'bg-black/80' : 'bg-black/50'}`} />
      )}

      {/* Sidebar container */}
      <div
        ref={sidebarRef}
        className={`fixed z-50 left-0 top-0 h-screen w-64 transition-all duration-300
                 ${darkMode ? 'bg-slate-900 text-gray-100 border-r border-slate-800' : 'bg-white text-gray-800 border-r border-gray-200'}
                 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                  md:static md:translate-x-0`}
      >

        <div className="flex flex-col h-full p-4">
          {/* Sidebar header */}
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className={`text-xl font-semibold flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              <LayoutDashboard className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              Dashboard
            </h2>
            {/* Close button for mobile */}
            <X
              onClick={toggleSidebar}
              className={`hover:text-gray-700 cursor-pointer md:hidden ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500'}`}
              aria-label="Close menu"
            />
          </div>

          {/* Navigation links */}
          <nav className="space-y-1">
            {navItems.map(({ path, name, icon }) => (
              <NavLink
                key={path}
                to={path}
                onClick={toggleSidebar}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm
                  transition-colors duration-200
                  ${darkMode 
                    ? `hover:bg-slate-800 hover:text-blue-400 ${isActive ? 'bg-slate-800 text-blue-400' : 'text-gray-300'}`
                    : `hover:bg-blue-50 hover:text-blue-600 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`
                  }
                `}
                aria-current={({ isActive }) => isActive ? 'page' : undefined}
              >
                {icon}
                {name}
              </NavLink>
            ))}
          </nav>

          {/* Dark mode toggle at bottom */}
          <div className={`mt-auto pt-4 ${darkMode ? 'border-t border-slate-800' : 'border-t border-gray-100'}`}>
            <button
              onClick={toggleDarkMode}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                transition-colors duration-200 ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <>
                  <Sun className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-gray-300">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-600">Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;