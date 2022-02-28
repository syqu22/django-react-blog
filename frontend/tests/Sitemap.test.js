import React from "react";
import { render } from "@testing-library/react";
import Sitemap from "../src/components/Sitemap";
import "@testing-library/jest-dom/extend-expect";

test("Renders sitemap component", () => {
  const { getByText } = render(<Sitemap />);
  expect(getByText("Sitemap")).toBeInTheDocument();
});
