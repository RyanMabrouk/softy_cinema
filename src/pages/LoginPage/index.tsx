import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import fetchData from "../../Api/fetchData";
import UserContext from "../../Context/UserContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authToken, generateSession, logIn } from "./Auth";
import { SignUpOption } from "./SignUpOption";
import { FormHeader } from "./FormHeader";
import { useSearchParams } from "react-router-dom";

const MAXIMUM_PASSWORD_LENGTH = 30;
const MINIMUM_PASSWORD_LENGTH = 6;
interface ILoginValues {
  user: string;
  password: string;
  confirm_password: string;
}
const loginValidationSchema = () => {
  return Yup.object({
    user: Yup.string().required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .max(
        MAXIMUM_PASSWORD_LENGTH,
        `Maximum password length is ${MAXIMUM_PASSWORD_LENGTH} characters`
      )
      .min(
        MINIMUM_PASSWORD_LENGTH,
        `Minimum password length is ${MINIMUM_PASSWORD_LENGTH} characters`
      ),
    confirm_password: Yup.string().oneOf(
      [Yup.ref("password"), ""],
      "Passwords must match"
    ),
  });
};

export default function LogIn() {
  const { signup, setSessionId, setPopup } = useContext(UserContext);
  const [validation] = useSearchParams();
  useEffect(() => {
    if (validation.get("approved")) {
      const getSession = async () => {
        const session_id = await generateSession(
          validation.get("request_token")
        );
        if (session_id) {
          setPopup("Welcome to SoftyCinema .!");
          setSessionId(session_id);
        }
      };
      getSession();
    }
  }, []);

  //--------------Sync session id------------------
  useEffect(() => {
    const session_id = localStorage.getItem("sessionId");
    if (session_id !== null) {
      setSessionId(JSON.parse(session_id));
    }
  }, []);
  async function generateGuest() {
    try {
      const res = await fetchData(`/authentication/guest_session/new`);
      if (res.success) {
        //setSessionId(res.guest_session_id);
        //to do -> use guest id
        setPopup("Welcome Guest .!");
        setSessionId("");
      }
    } catch (err) {
      alert("Somthing went wrong please contact support!");
      console.error(err);
    }
  }
  //------------Form management------------------
  const handleSubmitForm = async (loginFormikForm) => {
    const { user, password } = loginFormikForm.values;
    const res = await logIn(user, password);
    if (res) {
      setPopup(`Welcome Back ${user} .!`);
      setSessionId(res);
    }
  };
  const loginFormikForm = useFormik({
    initialValues: {
      user: "",
      password: "",
      confirm_password: "",
    } as ILoginValues,
    validationSchema: loginValidationSchema,
    onSubmit: () => handleSubmitForm(loginFormikForm),
  });
  //---------------------------------
  return (
    <main className="log_in_conatiner">
      <section className="left_container">
        <h1 className="sub_title">{signup && "No Problem "}</h1>
        <h1 className="title">
          {signup ? "You can join us .!" : "Welcome Back .!"}
        </h1>
      </section>
      <div>
        <section className="right_container">
          <FormHeader />
          <form
            onSubmit={loginFormikForm.handleSubmit}
            style={{ marginTop: signup ? "-1rem" : "4.5rem" }}
          >
            <TextField
              id="user"
              label="Username"
              type="text"
              margin="normal"
              color="secondary"
              placeholder="user"
              value={loginFormikForm.values.user}
              onChange={loginFormikForm.handleChange}
              error={
                loginFormikForm.touched.user &&
                Boolean(loginFormikForm.errors.user)
              }
              helperText={
                loginFormikForm.touched.user && loginFormikForm.errors.user
              }
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              color="secondary"
              placeholder="Password"
              value={loginFormikForm.values.password}
              onChange={loginFormikForm.handleChange}
              error={
                loginFormikForm.touched.password &&
                Boolean(loginFormikForm.errors.password)
              }
              helperText={
                loginFormikForm.touched.password &&
                loginFormikForm.errors.password
              }
            />
            {signup && (
              <TextField
                id="confirm_password"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                margin="normal"
                color="secondary"
                placeholder="Confirm Password"
                value={loginFormikForm.values.confirm_password}
                onChange={loginFormikForm.handleChange}
                error={
                  loginFormikForm.touched.confirm_password &&
                  Boolean(loginFormikForm.errors.confirm_password)
                }
                helperText={
                  loginFormikForm.touched.confirm_password &&
                  loginFormikForm.errors.confirm_password
                }
              />
            )}
            <button type="submit">{signup ? "Sign up" : "Login"}</button>
            <SignUpOption />
            <div className="or">
              <hr /> Or <hr />
            </div>
            <div className="guest">
              {signup ? "Make a " : "Login as a"}
              <label htmlFor="guest_session">
                <strong>{signup ? "TMDB account" : " Guest "}</strong>
              </label>
              <input
                type="button"
                id="guest_session"
                onClick={signup ? authToken : generateGuest}
              />
            </div>
          </form>
        </section>
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
      </div>
    </main>
  );
}
