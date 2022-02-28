import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ScrollToTop from "../src/components/ScrollToTop";

test("scroll to top functionality", async () => {
  const scrollToSpy = jest.fn();
  window.scrollTo = scrollToSpy;

  render(<ScrollToTop />, { wrapper: MemoryRouter });

  expect(scrollToSpy).toHaveBeenCalled();
  expect(scrollToSpy.mock.lastCall).toEqual([0, 0]);
});
