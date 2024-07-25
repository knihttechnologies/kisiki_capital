import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
//import FormContext from '../../context/FormContext';
import App from './App';
import '@/css/style.css';
import '@/css/satoshi.css';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { CookiesProvider } from 'react-cookie';
import { TableProvider } from './context/TableContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    <AppProvider>
      <CookiesProvider>
          <Router>
             <AuthProvider>
              <TableProvider>
                <App />
              </TableProvider>
            </AuthProvider>
          </Router>
      </CookiesProvider>
    </AppProvider>
  </React.StrictMode>,
);
