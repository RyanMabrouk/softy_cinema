import { toast } from "react-toastify";
import { LOCAL_LINK, WEB_LINK } from "../../Services/constants";
import getData from "../../Services/getData";
import postData from "../../Services/postData";

export async function logIn(user, password) {
  try {
    const res = await getData(`/authentication/token/new`);
    if (res?.success) {
      const PAYLOAD = {
        username: user,
        password: password,
        request_token: res.request_token,
      };
      const validation = await postData(
        PAYLOAD,
        `/authentication/token/validate_with_login`
      );
      if (validation?.success) {
        const session_id = await generateSession(res.request_token);
        if (session_id) {
          return session_id;
        }
      }
    }
  } catch (err) {
    toast.error("Somthing went wrong please contact support!");
  }
}

export async function generateToken() {
  try {
    const res = await getData(`/authentication/token/new`);
    if (res?.success) {
      return res.request_token;
    }
  } catch (err) {
    toast.error("Somthing went wrong please contact support!");
  }
}

export async function authToken() {
  try {
    const REQUEST_TOKEN = await generateToken();
    if (REQUEST_TOKEN) {
      location.href = `https://www.themoviedb.org/authenticate/${REQUEST_TOKEN}?
      redirect_to=${WEB_LINK}`;
    }
  } catch (err) {
    toast.error("Somthing went wrong please contact support!");
  }
}

export async function generateSession(TOKEN) {
  try {
    const TOKEN_PAYLOAD = {
      request_token: TOKEN,
    };
    const res = await postData(TOKEN_PAYLOAD, `/authentication/session/new`);
    if (res?.success) {
      return res.session_id;
    }
  } catch (err) {
    toast.error("Somthing went wrong please contact support!");
  }
}
export async function generateGuest() {
  try {
    const res = await getData(`/authentication/guest_session/new`);
    if (res?.success) {
      return res.guest_session_id;
    }
  } catch (err) {
    toast.error("Somthing went wrong please contact support!");
  }
}
export function logOut() {
  localStorage.removeItem("sessionId");
}
