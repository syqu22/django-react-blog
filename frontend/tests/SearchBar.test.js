import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../src/components/SearchBar";
import "@testing-library/jest-dom/extend-expect";

test("renders searchbar component", async () => {
  const { getByRole } = render(<SearchBar />);
  expect(getByRole("textbox")).toBeInTheDocument();
});

test("search bar functionality", async () => {
  const callbackMock = jest.fn();
  const { getByRole } = render(<SearchBar callback={callbackMock} />);
  const input = getByRole("textbox");

  userEvent.paste(input, "Testing Search");
  expect(input).toHaveValue("Testing Search");
  expect(callbackMock.mock.lastCall[0]).toBe("testing search");
});
