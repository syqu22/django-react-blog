import React from "react";
import { render } from "@testing-library/react";
import NotFound from "../../src/components/errors/NotFound";
import "@testing-library/jest-dom/extend-expect";

test("renders Not found error component", async () => {
  const { getByText } = render(<NotFound />);
  expect(getByText("404 - Not Found")).toBeInTheDocument();
});
