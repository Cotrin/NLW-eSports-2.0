import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom'

import './styles/main.css'

import { routes } from './routes'

const router = createBrowserRouter(createRoutesFromElements(routes))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
