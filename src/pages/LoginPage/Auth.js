import fetchData from "../../Api/fetchData";
import postData from "../../Api/postData";

export async function logIn(user, password) {
  try {
    const res = await fetchData(`/authentication/token/new`);
    if (res.success) {
      const PAYLOAD = {
        username: user,
        password: password,
        request_token: res.request_token,
      };
      const validation = await postData(
        PAYLOAD,
        `/authentication/token/validate_with_login`
      );
      if (validation.success) {
        const session_id = await generateSession(res.request_token);
        if (session_id) {
          return session_id;
        }
      } else {
        alert("User Error : " + validation.status_message);
      }
    } else {
      console.log(res.status_message);
      alert(
        "Somthing went wrong please try again later or login with a guest account"
      );
    }
  } catch (err) {
    console.error(err);
  }
}
export function logOut() {
  localStorage.removeItem("sessionId");
}
export async function generateToken() {
  try {
    const res = await fetchData(`/authentication/token/new`);
    if (res.success) {
      return res.request_token;
    } else {
      console.log(res.status_message);
      alert(
        "Somthing went wrong please try again later or login with a guest account"
      );
    }
  } catch (err) {
    console.error(err);
  }
}

export async function authToken() {
  try {
    const REQUEST_TOKEN = await generateToken();
    if (REQUEST_TOKEN) {
      location.href = `https://www.themoviedb.org/authenticate/${REQUEST_TOKEN}?redirect_to=https://softy-cinema.web.app`;
    }
  } catch (err) {
    console.error(err);
  }
}

export async function generateSession(TOKEN) {
  try {
    const TOKEN_PAYLOAD = {
      request_token: TOKEN,
    };
    const res = await postData(TOKEN_PAYLOAD, `/authentication/session/new`);
    if (res.success) {
      return res.session_id;
    }
  } catch (err) {
    console.error(err);
  }
}
