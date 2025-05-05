import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext.jsx'
import { DarkModeProvider } from './context/DarkModeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeProvider>
      <AuthProvider>
        <Toaster position='bottom-right' />
        <App />
      </AuthProvider>
    </DarkModeProvider>
  </StrictMode>,
)
