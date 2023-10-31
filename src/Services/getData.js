import { API_URL, AUTH_TOKEN } from "./constants";

export default async function getData(path, signal) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    signal: signal,
  };
  try {
    const res = await fetch(`${API_URL}${path}`, options);
    const response = await res.json();
    const data = await response;
    return data.results ? data.results : data;
  } catch (err) {
    console.error(err);
    return err;
  }
}
