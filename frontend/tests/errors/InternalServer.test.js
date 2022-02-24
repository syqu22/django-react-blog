import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import InternalServer from "../../src/components/errors/InternalServer";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("Renders internal server error page", () => {
  act(() => {
    ReactDOM.render(<InternalServer />, container);
  });

  const h1 = container.querySelector(".error");

  expect(h1.textContent).toBe("505 - Internal Server Error");
});
