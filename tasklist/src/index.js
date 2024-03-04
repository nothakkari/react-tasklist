import React from 'react';

import ReactDOM from 'react-dom/client';

import './index.css';

import Root from "./root";
import ErrorPage from "./error-page";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import EditTask from './routes/EditTask';
import AboutTask from './routes/AboutTask';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:taskId/edit",
    element: <EditTask />
  },
  {
    path: "/:taskId",
    element: <AboutTask />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
