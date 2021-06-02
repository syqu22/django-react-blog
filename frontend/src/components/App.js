import React, { StrictMode } from "react";
import { render } from "react-dom";

const App = () => {
  return (
    <div>
      <p>Hello World</p>
    </div>
  );
};

const root = document.getElementById("root");
render(
  <StrictMode>
    <App />
  </StrictMode>,
  root
);
