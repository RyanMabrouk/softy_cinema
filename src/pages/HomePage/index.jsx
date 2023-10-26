import React, { lazy, useContext, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Main = lazy(() => import("./componants/main"));
const Nav = lazy(() => import("./componants/nav"));

export default function HomePage() {
  const { sessionId, setSessionId, popup } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    setSessionId(JSON.parse(localStorage.getItem("sessionId")));
  }, []);
  if (sessionId === null) {
    navigate("/");
  }
  useEffect(() => {
    if (popup) {
      toast(popup);
    }
    console.log("🚀 ~ file: UserContext.jsx:22 ~ useEffect ~ popup:", popup);
  }, [popup]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Nav />
      <Main />
    </>
  );
}
