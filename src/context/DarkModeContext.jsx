import { createContext, useContext, useEffect, useState } from "react";


const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode) {
            setDarkMode(JSON.parse(savedMode));
            document.documentElement.classList.toggle('dark', JSON.parse(savedMode));
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prev => {
            const newMode = !prev
            localStorage.setItem('darkMode', JSON.stringify(newMode))
            document.documentElement.classList.toggle('dark', newMode)
            return newMode
        })
    }

    return (
        <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    )
}

export const useDarkMode = () => useContext(DarkModeContext);