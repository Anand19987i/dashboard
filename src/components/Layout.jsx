/**
 * Layout component that provides a structure for the application with a sidebar and a navbar.
 * 
 * @component
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child components to be rendered inside the layout.
 * 
 * @returns {JSX.Element} The rendered Layout component.
 */
import React, { useState } from 'react'
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({children}) => {
    // State to manage the visibility of the sidebar
    const [sidebarOpen, setSidebarOpen] = useState(false);

    /**
     * Toggles the sidebar's open/close state.
     */
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <div className="flex h-screen overflow-hidden">
        {/* Sidebar stays fixed and non-scrollable */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
  
        {/* Right side (navbar + scrollable content) */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Navbar toggleSidebar={toggleSidebar} />
  
          {/* Scrollable content */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    )
}

export default Layout