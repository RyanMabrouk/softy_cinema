import React from "react";

export function ToggleBtn(props) {
  return (
    <>
      <label htmlFor={"toggle" + props.name}>
        <h1 className="toggle">{props.toggle ? "-" : "+"}</h1>
      </label>
      <input
        type="button"
        id={"toggle" + props.name}
        onClick={props.handleToggle}
      />
    </>
  );
}
