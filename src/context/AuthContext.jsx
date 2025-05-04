import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();
/** 
 * AuthProvider component that provides authentication context to its children.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child components that will have access to the authentication context.
 *
 * @description
 * This component uses React's Context API to provide authentication-related state and functions
 * (`isAuthenticated`, `login`, and `logout`) to its child components. It manages the authentication
 * state internally and exposes methods to log in and log out.
 *
 * @returns {JSX.Element} - The AuthContext.Provider component wrapping the children.
 */
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // This will stores admin email when login
  /**
   * Authenticates a user based on the provided email and password.
   *
   * @function login
   * @param {string} email - The email address of the user attempting to log in.
   * @param {string} password - The password of the user attempting to log in.
   * @returns {boolean} - Returns `true` if the email and password match the predefined credentials,
   *                      otherwise returns `false`.
   *
   * @description
   * This function checks if the provided email and password match the hardcoded
   * credentials (`admin@example.com` and `password123`). If the credentials are valid,
   * it updates the authentication state by setting `setIsAuthenticated(true)`.
   * Otherwise, it returns `false` without modifying the authentication state.
   *
   * @note
   * This implementation is for demonstration purposes only and should not be used
   * in production. Hardcoding credentials is insecure. Consider using a secure
   * authentication mechanism such as OAuth or JWT for real-world applications.
   */

  const login = (email, password) => {
  if (email === 'admin@example.com' && password === 'password123') {
    setIsAuthenticated(true);
    setUser({email});
    return true;
  }
  return false;
};

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
// Exporting the AuthContext to allow access to the context directly if needed
export const useAuth = () => {
  return useContext(AuthContext);
}