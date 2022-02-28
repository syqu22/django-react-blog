import React from "react";
import { render } from "@testing-library/react";
import HomePage from "../src/components/HomePage";
import "@testing-library/jest-dom/extend-expect";

test("renders homepage component", async () => {
  const { getByText } = render(<HomePage />);
  expect(getByText("Welcome to my Blog!")).toBeInTheDocument();
});
