import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Sitemap from "../src/components/Sitemap";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("Renders sitemap page", () => {
  act(() => {
    ReactDOM.render(<Sitemap />, container);
  });

  const mainDiv = container.querySelector("div");

  expect(mainDiv.textContent).toBe("");
});
