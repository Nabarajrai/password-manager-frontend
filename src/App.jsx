import React from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes";
//toasts
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
      />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
