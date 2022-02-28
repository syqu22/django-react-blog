import React from "react";
import { render } from "@testing-library/react";
import Sitemap from "../src/components/Sitemap";
import "@testing-library/jest-dom/extend-expect";

test("renders sitemap component", async () => {
  const { getByText } = render(<Sitemap />);
  expect(getByText("Sitemap")).toBeInTheDocument();
});
