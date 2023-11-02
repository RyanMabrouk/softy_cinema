import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { LoginContext } from "./Context/UserContext.jsx";
import store from "./Store/store.js";
import { Provider } from "react-redux";
import { ProtectedRoute } from "./pages/UI/ProtectedRoute.jsx";
import Loader from "./pages/UI/Loader.jsx";
import { Toaster } from "./pages/UI/Toaster.jsx";
const Login = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Loader className="home_loader" />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      { path: "/", element: <Login /> },
      {
        path: "/Home",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
export default function App() {
  return (
    <div className="container">
      <Provider store={store}>
        <LoginContext>
          <RouterProvider router={router} />
          <Toaster />
        </LoginContext>
      </Provider>
    </div>
  );
}
