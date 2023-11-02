import React, { createContext, useEffect, useState } from "react";
import { newSessionData } from "../Store/dataThunks";
import { useDispatch } from "react-redux";

const UserContext = createContext();
export default UserContext;

export function LoginContext(props) {
  const dispatch = useDispatch();
  const [sessionId, setSessionId] = useState(null);
  const [signup, setSignup] = useState(false);
  useEffect(() => {
    if (sessionId !== null) {
      localStorage.setItem("sessionId", JSON.stringify(sessionId));
      dispatch(newSessionData(sessionId));
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
