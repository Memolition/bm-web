import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Login from './Login';
import Dashboard from './Dashboard';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import JournalRegistry from './Dashboard/JournalRegistry';
import ReportsView from './Dashboard/ReportsView';
import SettingsView from './Dashboard/SettingsView';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <JournalRegistry />,
      },
      {
        path: "/reports",
        element: <ReportsView />,
      },
      {
        path: "/settings",
        element: <SettingsView />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
