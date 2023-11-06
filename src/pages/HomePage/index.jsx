import React, { lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../UI/Loader";
const Main = lazy(() => import("./componants/main"));
const Nav = lazy(() => import("./componants/nav"));

export default function HomePage() {
  return (
    <>
      <Nav />
      <Suspense fallback={<Loader className="home_loader" />}>
        <Main />
      </Suspense>
    </>
  );
}
