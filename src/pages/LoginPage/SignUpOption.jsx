import React, { useContext } from "react";
import UserContext from "../../Context/UserContext";

export function SignUpOption() {
  const { signup, setSignup } = useContext(UserContext);
  return (
    <p className="signup">
      {signup ? "Already have an account ?" : "Don’t have a TMDB account ?"}
      <label htmlFor="signup">
        <strong> {signup ? " Login " : " Sign up "} </strong>
      </label>
      <input
        type="button"
        id="signup"
        onClick={() => setSignup((old) => !old)}
      />
    </p>
  );
}
