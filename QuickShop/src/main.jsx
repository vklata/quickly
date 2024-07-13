// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "antd/dist/reset.css";

import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from "./context/auth";
import { CartProvider } from "./context/cart";
import { SearchProvider } from "./context/search";


ReactDOM.createRoot(document.getElementById("root")).render(
 <AuthProvider>
   <SearchProvider >
  <CartProvider>
  <React.StrictMode>

      <ThemeProvider>
        <App />
      </ThemeProvider>
    
  </React.StrictMode>
  </CartProvider>
  </SearchProvider>
  </AuthProvider>
);

