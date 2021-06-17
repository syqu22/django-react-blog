import React, { useContext } from "react";
import { Route, Redirect } from "react-router";
import { UserContext } from "./providers/UserContext";
import PropTypes from "prop-types";

// Redirect to Home page when user is logged in
export const NoAuthRoute = (props) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      path={props.path}
      render={(data) =>
        !user ? <props.component {...data} /> : <Redirect to="/" />
      }
    />
  );
};

NoAuthRoute.propTypes = {
  path: PropTypes.string,
};

// Redirect to Login page when user is not logged in
export const ProtectedRoute = (props) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      path={props.path}
      render={(data) =>
        user ? <props.component {...data} /> : <Redirect to="/login" />
      }
    />
  );
};

ProtectedRoute.propTypes = {
  path: PropTypes.string,
};
