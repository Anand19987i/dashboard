/**
 * Layout Component
 *
 * Provides the foundational structure of the application, including:
 * - A responsive Sidebar (collapsible)
 * - A fixed Navbar
 * - A scrollable main content area
 * - Dark mode support using context
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The main content to be rendered within the layout.
 *
 * @returns {JSX.Element} The rendered layout with sidebar, navbar, and content area.
 */

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useDarkMode } from '../context/DarkModeContext';

const Layout = ({ children }) => {
  // ------------------------ State ------------------------

  const [sidebarOpen, setSidebarOpen] = useState(false); // Manages sidebar visibility

  // ------------------------ Context ------------------------

  const { darkMode } = useDarkMode(); // Access dark mode state from context

  // ------------------------ Handlers ------------------------

  /**
   * Toggles the sidebar's visibility state.
   */
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // ------------------------ Styles ------------------------

  const containerClass = darkMode ? 'bg-slate-900 text-white' : 'bg-white text-gray-900';

  // ------------------------ Render ------------------------

  return (
    <div className={`flex h-screen overflow-hidden ${containerClass}`}>
      
      {/* ---------- Sidebar ---------- */}
      {/* Sidebar remains fixed and is toggled via state */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* ---------- Main Area ---------- */}
      {/* Contains navbar and scrollable content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Scrollable content container */}
        <main className={`flex-1 overflow-y-auto transition-colors duration-300 ${containerClass}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
