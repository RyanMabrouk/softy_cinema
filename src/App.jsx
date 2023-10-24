import React from "react";
import Main from "./componants/main";
import Nav from "./componants/nav";
import { Context } from "./Context/SearchContext.jsx";

function App() {
  return (
    <div className="container">
      <Context>
        <Nav />
        <Main />
      </Context>
    </div>
  );
}

export default App;
