import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router, MemoryRouter } from "react-router-dom";
import Footer from "../src/components/Footer";
import "@testing-library/jest-dom/extend-expect";

test("renders footer component", async () => {
  const { getByText } = render(<Footer />, { wrapper: MemoryRouter });

  expect(getByText("Sitemap")).toBeInTheDocument();
  expect(getByText("Privacy Policy")).toBeInTheDocument();
  expect(getByText("Terms of Use")).toBeInTheDocument();
  expect(getByText("License")).toBeInTheDocument();
});

test("buttons refer to the respective urls", async () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <Footer />
    </Router>
  );

  userEvent.click(getByText("Sitemap"));
  expect(history.location.pathname).toEqual("/sitemap");

  userEvent.click(getByText("Privacy Policy"));
  expect(history.location.pathname).toEqual("/privacy");

  userEvent.click(getByText("Terms of Use"));
  expect(history.location.pathname).toEqual("/terms");

  userEvent.click(getByText("License"));
  expect(history.location.pathname).toEqual("/license");
});
