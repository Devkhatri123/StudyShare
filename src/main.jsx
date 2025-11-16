import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ErrorProvider } from './ContextApi/ErrorContext.jsx'
import { AuthenticationProvider } from './ContextApi/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { Analytics } from '@vercel/analytics/react'
createRoot(document.getElementById('root')).render(
   <BrowserRouter>
   <AuthenticationProvider>
     <Analytics/>
    <App />
    <ToastContainer position='top-center' theme='colored'/>
    </AuthenticationProvider>
    </BrowserRouter>
)
