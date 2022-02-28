import React from "react";
import { render } from "@testing-library/react";
import Privacy from "../src/components/Privacy";
import "@testing-library/jest-dom/extend-expect";

test("renders privacy component", async () => {
  const { getByText } = render(<Privacy />);
  expect(getByText("Privacy Policy")).toBeInTheDocument();
  expect(getByText("Definitions")).toBeInTheDocument();
  expect(getByText("Service Provider")).toBeInTheDocument();
});
