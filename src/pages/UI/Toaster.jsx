import React from "react";
import { ToastContainer } from "react-toastify";

export function Toaster() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      //pauseOnFocusLoss
      draggable
      //pauseOnHover
      theme="dark"
    />
  );
}
