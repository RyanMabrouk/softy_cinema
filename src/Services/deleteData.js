import { API_URL, AUTH_TOKEN } from "./constants";

const options = {
  method: "DELETE",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
};
export default async function fetchData(path, sessionId = "") {
  try {
    const res = await fetch(
      `${API_URL}${path + (sessionId && "?session_id=" + sessionId)}`,
      options
    );
    const response = await res.json();
    const data = await response;
    return data.results ? data.results : data;
  } catch (err) {
    console.error(err);
    return err;
  }
}
