import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { UserContext } from "../src/providers/UserContext";
import { MemoryRouter, Router } from "react-router-dom";
import NavBar from "../src/components/NavBar";
import "@testing-library/jest-dom/extend-expect";

test("renders navbar component", async () => {
  const user = jest.fn();
  const { getByText } = render(
    <UserContext.Provider value={user}>
      <NavBar />
    </UserContext.Provider>,
    { wrapper: MemoryRouter }
  );

  expect(getByText("Home")).toBeInTheDocument();
  expect(getByText("Posts")).toBeInTheDocument();
  expect(getByText("User Panel")).toBeInTheDocument();
  expect(getByText("Log Out")).toBeInTheDocument();
});

test("renders navbar component with user not logged on", async () => {
  const { getByText } = render(
    <UserContext.Provider value={{ user: null }}>
      <NavBar />
    </UserContext.Provider>,
    { wrapper: MemoryRouter }
  );

  expect(getByText("Home")).toBeInTheDocument();
  expect(getByText("Posts")).toBeInTheDocument();
  expect(getByText("Sign Up")).toBeInTheDocument();
  expect(getByText("Log In")).toBeInTheDocument();
});

test("links refer to the respective urls", async () => {
  const history = createMemoryHistory();
  const user = jest.fn();
  const { getAllByRole } = render(
    <Router history={history}>
      <UserContext.Provider value={user}>
        <NavBar />
      </UserContext.Provider>
    </Router>
  );
  const links = getAllByRole("link");

  userEvent.click(links[0]);
  expect(history.location.pathname).toEqual("/");

  userEvent.click(links[1]);
  expect(history.location.pathname).toEqual("/posts");

  userEvent.click(links[2]);
  expect(history.location.pathname).toEqual("/user");

  userEvent.click(links[3]);
  expect(history.location.pathname).toEqual("/logout");
});

test("links refer to the respective urls while user not logged on", async () => {
  const history = createMemoryHistory();
  const { getAllByRole } = render(
    <Router history={history}>
      <UserContext.Provider value={{ user: null }}>
        <NavBar />
      </UserContext.Provider>
    </Router>
  );
  const links = getAllByRole("link");

  userEvent.click(links[0]);
  expect(history.location.pathname).toEqual("/");

  userEvent.click(links[1]);
  expect(history.location.pathname).toEqual("/posts");

  userEvent.click(links[2]);
  expect(history.location.pathname).toEqual("/signup");

  userEvent.click(links[3]);
  expect(history.location.pathname).toEqual("/login");
});
