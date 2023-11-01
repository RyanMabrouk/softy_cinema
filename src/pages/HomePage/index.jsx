import React, { lazy, useContext, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigation } from "react-router-dom";
import Loader from "../UI/Loader";
const Main = lazy(() => import("./componants/main"));
const Nav = lazy(() => import("./componants/nav"));

export default function HomePage() {
  const { popup } = useContext(UserContext);
  useEffect(() => {
    if (popup) {
      toast(popup);
    }
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
