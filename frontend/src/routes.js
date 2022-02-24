import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { UserContext, UserProvider } from "./providers/UserContext";
import HomePage from "./components/HomePage";
import PostDetail from "./components/posts/PostDetail";
import Posts from "./components/posts/Posts";
import NavBar from "./components/NavBar";
import NotFound from "./components/errors/NotFound";
import InternalServer from "./components/errors/InternalServer";
import PasswordReset from "./components/user/PasswordReset";
import PasswordResetEmail from "./components/user/PasswordResetEmail";
import EmailVerification from "./components/user/EmailVerification";
import DeleteAccount from "./components/user/DeleteAccount";
import Footer from "./components/Footer";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import User from "./components/user/User";
import SiteMap from "./components/Sitemap";
import Privacy from "./components/Privacy";
import License from "./components/License";
import Terms from "./components/Terms";
import ScrollToTop from "./components/ScrollToTop";

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

const Routes = () => {
  return (
    <Router>
      <div className="main">
        <UserProvider>
          <ScrollToTop />
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {/* Only logged in user can enter */}
            <ProtectedRoute path="/logout" component={Logout} />
            <ProtectedRoute path="/user" component={User} />
            {/* Everyone except logged in user can enter */}
            <NoAuthRoute path="/signup" component={Signup} />
            <NoAuthRoute path="/login" component={Login} />
            {/* Everyone can enter*/}
            <Route
              exact
              path="/password/reset"
              component={PasswordResetEmail}
            />
            <Route
              path="/password/reset/:uid/:token"
              component={PasswordReset}
            />
            <Route path="/verify/:uid/:token" component={EmailVerification} />
            <Route path="/delete/:uid/:token" component={DeleteAccount} />
            <Route path="/posts" component={Posts} />
            <Route path="/post/:slug" component={PostDetail} />
            <Route path="/sitemap" component={SiteMap} />
            <Route path="/license" component={License} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            {/* Error pages */}
            <Route path="/500" component={InternalServer} status={500} />
            <Route path="*" component={NotFound} status={404} />
          </Switch>
        </UserProvider>
      </div>
      <Footer />
    </Router>
  );
};

export default Routes;
