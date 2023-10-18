import React, { useState } from "react";
import Main from "./componants/main";
import Nav from "./componants/nav";

function App() {
  const [query,setQuery] = useState("")
  const [results,setResults] = useState(0)
  return (
    <div className="container">
      <Nav setQuery={setQuery} results={results}/>
      <Main query={query} setResults={setResults}/>
    </div>
  );
}

export default App;
