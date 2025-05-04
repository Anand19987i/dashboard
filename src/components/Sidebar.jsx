import { X, LayoutDashboard, Users, Settings } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Responsive Sidebar navigation component with enhanced UI/UX.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls sidebar visibility state
 * @param {Function} props.toggleSidebar - Toggle function for sidebar state
 * 
 * Features:
 * - Active route highlighting
 * - Smooth transitions and hover effects
 * - Contextual icons for navigation items
 * - Responsive behavior for mobile/desktop
 * - Accessible navigation labels
 * - Visual hierarchy improvements
 */
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = useRef();

  // Navigation items configuration
  const navItems = [
    {
      path: '/',
      name: 'Overview',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      path: '/users',
      name: 'Users',
      icon: <Users className="w-5 h-5" />
    },
    {
      path: '/settings',
      name: 'Settings',
      icon: <Settings className="w-5 h-5" />
    }
  ];

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
      {/* Semi-transparent overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden max-[850px]:hidden backdrop-blur-sm" />
      )}

      {/* Sidebar container */}
      <div
        ref={sidebarRef}
        className={`fixed z-50 left-0 top-0 h-screen w-64 bg-white shadow-xl transition-all duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:shadow-none`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Header section */}
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6 text-blue-600" />
              Dashboard
            </h2>
            <X 
              className="text-gray-500 hover:text-gray-700 cursor-pointer md:hidden" 
              onClick={toggleSidebar}
              aria-label="Close menu"
            />
          </div>

          {/* Navigation items */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={toggleSidebar}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-colors duration-200
                  hover:bg-blue-50 hover:text-blue-600
                  ${isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600'}
                `}
                aria-current={({ isActive }) => isActive ? "page" : undefined}
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Optional footer section */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="px-3 text-sm text-gray-500">
              v1.0.0
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;