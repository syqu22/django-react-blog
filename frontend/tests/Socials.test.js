import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Socials from "../src/components/Socials";

// Mock window.location
delete window.location;
window.location = { assign: jest.fn() };

test("renders socials component", async () => {
  const { getAllByRole } = render(<Socials />);
  expect(getAllByRole("button")).toHaveLength(3);
});

test("buttons refer to the respective urls", async () => {
  const { getAllByRole } = render(<Socials />);
  const buttons = getAllByRole("button");

  userEvent.click(buttons[0]);
  expect(window.location.href).toContain("https://www.facebook.com/");

  userEvent.click(buttons[1]);
  expect(window.location.href).toContain("http://instagram.com/");

  userEvent.click(buttons[2]);
  expect(window.location.href).toContain("https://twitter.com/");
});
