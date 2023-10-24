import React, { Suspense, lazy } from "react";
import { Context } from "./Context/SearchContext.jsx";
import Loader from "./componants/Loader.jsx";
const Main = lazy(() => import("./componants/main"));
const Nav = lazy(() => import("./componants/nav"));

function App() {
  return (
    <div className="container">
      <Context>
        <Suspense fallback={<Loader className="home_loader" />}>
          <Nav />
          <Main />
        </Suspense>
      </Context>
    </div>
  );
}
export default App;
