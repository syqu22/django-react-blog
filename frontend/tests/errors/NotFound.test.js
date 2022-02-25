import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import NotFound from "../../src/components/errors/NotFound";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("Renders terms of service page", () => {
  act(() => {
    ReactDOM.render(<NotFound />, container);
  });

  const h1 = container.querySelector(".error");

  expect(h1.textContent).toBe("404 - Not Found");
});
