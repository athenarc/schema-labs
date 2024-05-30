import React from 'react';
import './index.scss';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import router from "./routes.jsx";
import AuthProvider from './utils/components/auth/AuthProvider.jsx';
import ClientPreferencesProvider from './client/ClientPreferencesProvider.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClientPreferencesProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ClientPreferencesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
