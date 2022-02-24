import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Privacy from "../src/components/Privacy";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("Renders privacy page", () => {
  act(() => {
    ReactDOM.render(<Privacy />, container);
  });

  const mainDiv = container.querySelector(".privacy");
  const h1 = container.querySelector("h1");

  expect(mainDiv.children).toHaveLength(52);
  expect(h1.textContent).toBe("Privacy Policy");
});
