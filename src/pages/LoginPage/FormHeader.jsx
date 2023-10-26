import React, { useContext } from "react";
import UserContext from "../../Context/UserContext";

export function FormHeader() {
  const { signup } = useContext(UserContext);
  return (
    <header>
      <h1 className="title">{signup ? "Signup" : "Login"}</h1>
      {!signup && <h1>Glad you’re back.!</h1>}
    </header>
  );
}
