import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Socials from "../../src/components/Socials";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("Renders socials navbar", () => {
  act(() => {
    ReactDOM.render(<Socials />, container);
  });

  const navbar = container.querySelector("div");
  const buttons = container.querySelectorAll("button");

  for (const i of buttons) {
    expect(navbar.children[i]).toBe(buttons[i]);
  }
  expect(buttons).toHaveLength(3);
});

// TODO
it("Buttons onClick redirects to set socials", () => {
  act(() => {
    ReactDOM.render(<Socials />, container);
  });
});
