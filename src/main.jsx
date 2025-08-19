import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ErrorProvider } from './ContextApi/ErrorContext.jsx'
import { AuthenticationProvider } from './ContextApi/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
createRoot(document.getElementById('root')).render(
   <BrowserRouter>
   <AuthenticationProvider>
    <App />
    <ToastContainer position='top-center' theme='colored'/>
    </AuthenticationProvider>
    </BrowserRouter>
)
