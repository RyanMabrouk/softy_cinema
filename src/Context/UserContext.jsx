import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();
export default UserContext;

export function LoginContext(props) {
  const [sessionId, setSessionId] = useState(null);
  const [signup, setSignup] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionId || sessionId === "") {
      localStorage.setItem("sessionId", JSON.stringify(sessionId));
      navigate("/Home");
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
