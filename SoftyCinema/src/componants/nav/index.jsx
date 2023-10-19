import React from "react";
import logo from "../../assets/logo.svg";
import thunder from "../../assets/thunder.svg";
export default function Nav(props) {
  function handleChange(e) {
    props.setQuery(e.target.value);
  }
  return (
    <nav>
      <img className="logo" src={logo} alt="" />
      <input
        className="search"
        type="text"
        placeholder="Search"
        onChange={handleChange}
      />
      <div>
        {props.loading ? (
          <>Loading...</>
        ) : (
          <>
            Found<span> {props.results ? props.results : 0} </span>results
          </>
        )}
        <img src={thunder} />
      </div>
    </nav>
  );
}
