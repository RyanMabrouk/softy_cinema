import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Context } from "./Context/SearchContext.jsx";
import Loader from "./pages/Loader.jsx";
import { LoginContext } from "./Context/UserContext.jsx";
const Login = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <LoginContext>
          <Context>
            <Suspense fallback={<Loader className="home_loader" />}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Home" element={<HomePage />} />
              </Routes>
            </Suspense>
          </Context>
        </LoginContext>
      </BrowserRouter>
    </div>
  );
}
export default App;

function Test() {
  return <div>Test</div>;
}
