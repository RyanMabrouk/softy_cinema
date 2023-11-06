import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSession, newQuery } from "../../../../Store/dataSlice";

import logo from "../../assets/logo.svg";
import thunder from "../../assets/thunder.svg";
import { logOut } from "../../../LoginPage/Auth";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchData, loading } = useSelector((state) => state.data.searchData);
  const [query, setQuery] = useState("");
  const searchInput = useRef(null);
  function handleChange(e) {
    setQuery(e.target.value);
  }
  useEffect(() => {
    const promise = dispatch(newQuery(query));
    return () => promise.abort();
  }, [query]);
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
          <img src={thunder} alt="" />
        </div>
        <button
          className="logout"
          onClick={() => {
            logOut();
            dispatch(clearSession());
            navigate("/");
          }}
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
