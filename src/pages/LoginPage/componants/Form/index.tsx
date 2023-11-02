import React, { useContext, useEffect } from "react";
import { TextField } from "@mui/material";
import UserContext from "../../../../Context/UserContext";
import { useFormik } from "formik";
import { authToken, generateSession, logIn, generateGuest } from "../../Auth";
import { SignUpOption } from "./SignUpOption";
import { FormHeader } from "./FormHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";

const MAXIMUM_PASSWORD_LENGTH = 30;
const MINIMUM_PASSWORD_LENGTH = 6;
export interface ILoginValues {
  user: string;
  password: string;
  confirm_password: string;
}
export const loginValidationSchema = () => {
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
export default function Form() {
  const { signup, setSessionId } = useContext(UserContext);
  const navigate = useNavigate();
  const [validation] = useSearchParams();
  //----------------Ridirect Sign-in-----------------------
  useEffect(() => {
    if (validation.get("approved")) {
      const getSession = async () => {
        const session_id = await generateSession(
          validation.get("request_token")
        );
        if (session_id) {
          toast("Welcome to SoftyCinema .!");
          setSessionId(session_id);
          navigate("/Home");
        }
      };
      getSession();
    }
  }, []);
  //-----------------Guest Session-------------------------
  async function handleGuest() {
    const geuest_id = await generateGuest();
    //to do -> use guest id
    toast("Welcome Guest .!");
    setSessionId("");
    navigate("/Home");
  }
  //------------Form on submit------------------
  const handleSubmitForm = async (loginFormikForm) => {
    const { user, password } = loginFormikForm.values;
    const res = await logIn(user, password);
    if (res) {
      toast(`Welcome Back ${user} .!`);
      setSessionId(res);
      navigate("/Home");
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
  return (
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
            loginFormikForm.touched.user && Boolean(loginFormikForm.errors.user)
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
            loginFormikForm.touched.password && loginFormikForm.errors.password
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
            onClick={signup ? authToken : handleGuest}
          />
        </div>
      </form>
    </section>
  );
}
