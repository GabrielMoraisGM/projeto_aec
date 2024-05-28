import './index.css';

import React from 'react';

import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import App from './App.tsx';
import Login from './components/Login/Login.tsx';
import AddressCreate from './components/Address/Create/AddressCreate.tsx';
import AddressSearch from './components/Address/Consult/AddressSearch.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/addressCreate",
    element: <AddressCreate/>
  },
  {
    path: "/addressSearch",
    element: <AddressSearch/>
  },
  {
    path: "/App",
    element: <App/>
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
