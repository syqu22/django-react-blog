import React from "react";
import { render } from "@testing-library/react";
import Comments from "../../src/components/comments/Comments";
import "@testing-library/jest-dom/extend-expect";

test("renders comments component", async () => {
  const { getByText } = render(<Comments />);
  expect(getByText("No comments yet")).toBeInTheDocument();
});
