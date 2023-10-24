import React, { useRef } from "react";
import { useContext } from "react";
import SearchContext from "../../Context/SearchContext.jsx";

import logo from "../../assets/logo.svg";
import thunder from "../../assets/thunder.svg";

export default function Nav() {
  const { loading, searchData, setQuery } = useContext(SearchContext);
  const searchInput = useRef(null);
  function handleChange(e) {
    setQuery(e.target.value);
  }
  return (
    <nav>
      <img className="logo" src={logo} alt="" />
      <input
        className="search"
        type="text"
        placeholder="Search"
        onChange={handleChange}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            searchInput.current.blur(); // removing focus
          }
        }}
        ref={searchInput}
        autoFocus
      />
      <div>
        {loading ? (
          <>Loading...</>
        ) : (
          <>
            Found<span> {searchData ? searchData.length : 0} </span>results
          </>
        )}
        <img src={thunder} />
      </div>
    </nav>
  );
}
