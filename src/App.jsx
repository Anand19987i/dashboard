import React from 'react'
import Dashboard from './pages/Dashboard'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './auth/Login'
import { useAuth } from './context/AuthContext'
import Overview from './pages/Overview'
import UsersList from './pages/UsersList'
import Settings from './pages/Settings'

const App = () => {
  const { isAuthenticated } = useAuth();
  // Define the application routes using createBrowserRouter
  const appRouter = createBrowserRouter([
    {
      // Route for the login page
      path: "/login",
      element: <Login /> // Render the Login component
    },
    /**{
      // Route for the root path
      path: "/",
      element: isAuthenticated ? <Dashboard /> : <Login /> // Render Dashboard if authenticated, otherwise Login
    },**/
    {
      // Route for the overview page
      path: "/",
      element: isAuthenticated ? <Overview /> : <Login /> // Render Overview if authenticated, otherwise Login
    },
    {
      // Route for the users list page
      path: "/users",
      element: isAuthenticated ? <UsersList /> : <Login /> // Render UsersList if authenticated, otherwise Login
    },
    {
      // Route for the settings page
      path: "/settings",
      element: isAuthenticated ? <Settings /> : <Login /> // Render Settings if authenticated, otherwise Login
    }
  ])
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App