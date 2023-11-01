import { API_URL, AUTH_TOKEN } from "./constants";

export default async function postData(data, url, sessionId = "") {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(data),
  };
  try {
    const res = await fetch(
      `${API_URL}${url + (sessionId && "?session_id=" + sessionId)}`,
      options
    );
    const response = await res.json();
    return response;
  } catch (err) {
    console.error(err);
  }
}
