import { toast } from "react-toastify";
import api from "./axios.config";

export default async function postData(payload, path, sessionId = "") {
  const options = {
    method: "POST",
    url: path,
    params: {
      sessionId: sessionId,
    },
    data: payload,
  };
  return await api
    .request(options)
    .then((response) => {
      toast(response.data.status_message);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      toast.error(error.response?.data?.status_message || error.message);
    });
}
