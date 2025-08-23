import React from "react";
import { RouterProvider } from "react-router/dom";
import { routes } from "./routes/Routes";
function App() {
  console.log("routes", routes);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
