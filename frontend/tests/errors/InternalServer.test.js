import React from "react";
import { render } from "@testing-library/react";
import InternalServer from "../../src/components/errors/InternalServer";
import "@testing-library/jest-dom/extend-expect";

test("renders internal server error component", async () => {
  const { getByText } = render(<InternalServer />);
  expect(getByText("505 - Internal Server Error")).toBeInTheDocument();
});
