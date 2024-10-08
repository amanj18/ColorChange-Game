import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routesConfig";

const App = lazy(() => import(/* webpackChunkName: "app" */ "./Routelets/App"));
const Home = lazy(() => import(/* webpackChunkName: "Home" */ "pages/Home"));

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
