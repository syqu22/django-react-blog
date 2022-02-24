import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Terms from "../../src/components/Terms";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("Renders terms of service", () => {
  act(() => {
    ReactDOM.render(<Terms />, container);
  });

  const mainDiv = container.querySelector(".terms");
  const h2 = container.querySelector("h2");
  const p = container.querySelector("p");

  expect(mainDiv.textContent).toBeTruthy();
  expect(h2.textContent).toBe("Terms and Conditions");
  expect(p.textContent).toBe("Welcome to Personal Blog!");
});
