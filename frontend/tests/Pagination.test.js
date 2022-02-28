import React from "react";
import { render, screen } from "@testing-library/react";
import Pagination from "../src/components/Pagination";
import "@testing-library/jest-dom/extend-expect";

const handleChange = jest.fn();

test("renders pagination component", async () => {
  render(<Pagination page={0} maxPages={5} handleChange={handleChange} />);
});

test("pagination functionality", async () => {
  const { rerender, getByText } = render(
    <Pagination page={0} maxPages={5} handleChange={handleChange} />
  );

  expect(getByText("1")).toHaveClass("disabled");
  expect(getByText("2")).toHaveClass("enabled");
  expect(getByText("3")).toHaveClass("enabled");
  expect(getByText("4")).toHaveClass("enabled");
  expect(getByText("5")).toHaveClass("enabled");
  expect(screen.getAllByRole("button")).toHaveLength(2);

  rerender(<Pagination page={1} maxPages={5} handleChange={handleChange} />);

  expect(getByText("1")).toHaveClass("enabled");
  expect(getByText("2")).toHaveClass("disabled");
  expect(getByText("3")).toHaveClass("enabled");
  expect(getByText("4")).toHaveClass("enabled");
  expect(getByText("5")).toHaveClass("enabled");
  expect(screen.getAllByRole("button")).toHaveLength(2);

  rerender(<Pagination page={0} maxPages={1} handleChange={handleChange} />);
  expect(screen.queryAllByRole("button")).toHaveLength(0);
});
