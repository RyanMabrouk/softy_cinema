import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import UserContext from "../../Context/UserContext.jsx";
import { useDispatch } from "react-redux";
import { clearSession, newSessionData } from "../../Store/dataSlice.js";

export function ProtectedRoute({ children }) {
  const { sessionId, setSessionId } = useContext(UserContext);
  let location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    setSessionId(JSON.parse(localStorage.getItem("sessionId")));
  }, []);
  useEffect(() => {
    if (sessionId || sessionId === "") {
      dispatch(newSessionData(sessionId));
    }
  }, [sessionId]);
  if (sessionId === null) {
    dispatch(clearSession());
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
