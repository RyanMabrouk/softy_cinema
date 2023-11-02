import { toast } from "react-toastify";
import api from "./axios.config";

export default async function getData(path, signal) {
  const options = {
    method: "GET",
    url: path,
    signal: signal,
  };
  return await api
    .request(options)
    .then((response) => {
      return response.data.results || response.data;
    })
    .catch((error) => {
      console.error(error);
      toast.error(
        error.response?.data?.status_message ||
          (error.message !== "canceled" && error.message)
      );
      return null;
    });
}
