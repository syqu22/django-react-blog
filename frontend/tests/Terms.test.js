import React from "react";
import { render } from "@testing-library/react";
import Terms from "../src/components/Terms";
import "@testing-library/jest-dom/extend-expect";

test("renders terms of service component", async () => {
  const { getByText } = render(<Terms />);

  expect(getByText("Terms and Conditions")).toBeInTheDocument();
  expect(getByText("Welcome to Personal Blog!")).toBeInTheDocument();
});
