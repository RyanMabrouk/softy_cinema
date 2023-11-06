import React, { lazy } from "react";
import "react-toastify/dist/ReactToastify.css";
const Main = lazy(() => import("./componants/main"));
const Nav = lazy(() => import("./componants/nav"));

export default function HomePage() {
  return (
    <>
      <Nav />
      <Suspanse fallback={<Loader className="home_loader" />}>
        <Main />
      </Suspanse>
    </>
  );
}
