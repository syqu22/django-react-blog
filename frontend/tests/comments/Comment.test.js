import React from "react";
import { render } from "@testing-library/react";
import Comment from "../../src/components/comments/Comment";
import "@testing-library/jest-dom/extend-expect";

const mockComment = {
  author: { avatar: "avatar", username: "User" },
  created_at: "2022-12-12",
  body: "Test comment body",
};

test("renders comment component", async () => {
  const { getByText, getByRole } = render(<Comment values={mockComment} />);
  expect(getByRole("img")).toBeInTheDocument();
  expect(getByText(mockComment.author.username)).toBeInTheDocument();
  expect(getByText(mockComment.body)).toBeInTheDocument();
});
