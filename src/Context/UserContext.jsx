import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();
export default UserContext;

export function LoginContext(props) {
  const [sessionId, setSessionId] = useState(null);
  const [signup, setSignup] = useState(false);
  useEffect(() => {
    if (sessionId !== null) {
      localStorage.setItem("sessionId", JSON.stringify(sessionId));
    }
  }, [sessionId]);
  return (
    <UserContext.Provider
      value={{ sessionId, setSessionId, signup, setSignup }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
