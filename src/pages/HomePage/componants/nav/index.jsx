import React, { useRef } from "react";
import { useContext } from "react";

import logo from "../../assets/logo.svg";
import thunder from "../../assets/thunder.svg";
import SearchContext from "../../../../Context/SearchContext";
import { logOut } from "../../../LoginPage/Auth";
import { useNavigate } from "react-router-dom";
export default function Nav() {
  const navigate = useNavigate();
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
        <div className="indicator">
          {loading ? (
            <>Loading...</>
          ) : (
            <>
              Found<span> {searchData ? searchData.length : 0} </span>results
            </>
          )}
          <img src={thunder} />
        </div>
        <button
          className="logout"
          onClick={() => {
            logOut();
            navigate("/");
          }}
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
