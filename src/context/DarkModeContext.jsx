import { createContext, useContext, useEffect, useState } from "react";

/**
 * DarkModeContext:
 * A React Context to manage dark mode state across the application.
 */
const DarkModeContext = createContext();

/**
 * DarkModeProvider:
 * Provides dark mode state and toggle functionality to its children.
 * 
 * Usage:
 * Wrap your app (or a part of it) in <DarkModeProvider> to enable dark mode support.
 */
export const DarkModeProvider = ({ children }) => {
    // State to track whether dark mode is active
    const [darkMode, setDarkMode] = useState(false);

    /**
     * useEffect:
     * On component mount, check if a previously saved dark mode preference exists in localStorage.
     * If found, apply it to both state and the HTML root class.
     */
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode) {
            const parsedMode = JSON.parse(savedMode);
            setDarkMode(parsedMode);
            document.documentElement.classList.toggle('dark', parsedMode);
        }
    }, []);

    /**
     * toggleDarkMode:
     * Toggles the dark mode state between true and false.
     * Also updates localStorage and toggles the 'dark' class on the HTML root element.
     */
    const toggleDarkMode = () => {
        setDarkMode(prev => {
            const newMode = !prev;
            localStorage.setItem('darkMode', JSON.stringify(newMode));
            document.documentElement.classList.toggle('dark', newMode);
            return newMode;
        });
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

/**
 * useDarkMode:
 * Custom hook to access the dark mode context.
 * 
 * Returns:
 * - darkMode: Boolean indicating whether dark mode is enabled.
 * - toggleDarkMode: Function to toggle dark mode.
 * 
 * Usage:
 * const { darkMode, toggleDarkMode } = useDarkMode();
 */
export const useDarkMode = () => useContext(DarkModeContext);
