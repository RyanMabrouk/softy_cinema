import React, { useState } from "react";
import Main from "./componants/main";
import Nav from "./componants/nav";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <div className="container">
      <Nav setQuery={setQuery} results={results} loading={loading} />
      <Main query={query} setResults={setResults} setLoading={setLoading} loading={loading} />
    </div>
  );
}

export default App;
