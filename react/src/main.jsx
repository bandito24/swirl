import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ContextProvider} from "../contexts/contextProvider.jsx";
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import './App.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
    <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>,
)
