import React, { useContext, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Form from "./componants/Form";

export default function LogIn() {
  const { signup, setSessionId, sessionId } = useContext(UserContext);
  const navigate = useNavigate();
  //-----------------------------------------------
  useEffect(() => {
    const session_id = localStorage.getItem("sessionId");
    if (session_id !== null) {
      setSessionId(JSON.parse(session_id));
      navigate("/Home");
    }
  }, [sessionId]);
  return (
    <main className="log_in_conatiner">
      <section className="left_container">
        <h1 className="sub_title">{signup && "No Problem "}</h1>
        <h1 className="title">
          {signup ? "You can join us .!" : "Welcome Back .!"}
        </h1>
      </section>
      <div>
        <Form />
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
      </div>
    </main>
  );
}
