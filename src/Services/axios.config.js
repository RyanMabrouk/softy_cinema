import axios from "axios";
import { API_URL, AUTH_TOKEN } from "./constants";

const api = axios.create({
  baseURL: API_URL,
  timeout: 0,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});
export default api;
