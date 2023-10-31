import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();
export default UserContext;

export function LoginContext(props) {
  const [sessionId, setSessionId] = useState(null);
  const [signup, setSignup] = useState(false);
  const [popup, setPopup] = useState("");
  useEffect(() => {
    if (sessionId !== null) {
      localStorage.setItem("sessionId", JSON.stringify(sessionId));
    }
  }, [sessionId]);
  return (
    <UserContext.Provider
      value={{ sessionId, setSessionId, signup, setSignup, popup, setPopup }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
