import React, { lazy, useContext, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
const Main = lazy(() => import("./componants/main"));
const Nav = lazy(() => import("./componants/nav"));

export default function HomePage() {
  const {sessionId, setSessionId } = useContext(UserContext);
  const navigate = useNavigate()
  useEffect(() => {
    setSessionId(JSON.parse(localStorage.getItem("sessionId")));
  }, []);
  if(sessionId === null){
    navigate("/")
  }
  return (
    <>
      <Nav />
      <Main />
    </>
  );
}
