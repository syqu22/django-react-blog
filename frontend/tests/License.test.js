import React from "react";
import { render } from "@testing-library/react";
import License from "../src/components/License";
import "@testing-library/jest-dom/extend-expect";

test("renders license component", async () => {
  const { getByText } = render(<License />);
  expect(
    getByText("MIT License Copyright (c) 2022 Aleksander Lejawa")
  ).toBeInTheDocument();
});
