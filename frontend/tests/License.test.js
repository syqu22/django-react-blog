import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import License from "../src/components/License";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("Renders license page", () => {
  act(() => {
    ReactDOM.render(<License />, container);
  });

  const mainDiv = container.querySelector(".license");
  const h3 = container.querySelector("h3");

  expect(mainDiv.children).toHaveLength(2);
  expect(h3.textContent).toBe(
    "MIT License Copyright (c) 2022 Aleksander Lejawa"
  );
});
