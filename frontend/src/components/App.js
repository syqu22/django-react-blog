import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserProvider } from "../providers/UserContext";
import { ProtectedRoute, NoAuthRoute } from "../routes";
import HomePage from "./HomePage";
import PostDetail from "./posts/PostDetail";
import Posts from "./posts/Posts";
import NavBar from "./NavBar";
import NotFound from "./errors/NotFound";
import InternalServer from "./errors/InternalServer";
import PasswordReset from "./user/PasswordReset";
import PasswordResetEmail from "./user/PasswordResetEmail";
import EmailVerification from "./user/EmailVerification";
import DeleteAccount from "./user/DeleteAccount";
import Footer from "./Footer";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import User from "./user/User";
import SiteMap from "./Sitemap";
import Privacy from "./Privacy";
import License from "./License";
import Terms from "./Terms";
import ScrollToTop from "./ScrollToTop";

const App = () => {
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

export default App;
