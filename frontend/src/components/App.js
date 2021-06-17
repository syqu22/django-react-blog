import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserProvider } from "../providers/UserContext";
import { ProtectedRoute, NoAuthRoute } from "../routes";
import HomePage from "./HomePage";
import PostDetail from "./posts/PostDetail";
import Posts from "./posts/Posts";
import Contact from "./Contact";
import NavBar from "./NavBar";
import NotFound from "./errors/NotFound";
import InternalServer from "./errors/InternalServer";
import Footer from "./Footer";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import User from "./User";

const App = () => {
  return (
    <Router>
      <div className="App">
        <UserProvider>
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
            <Route path="/contact" component={Contact} />
            <Route path="/posts" component={Posts} />
            <Route path="/post/:slug" component={PostDetail} />
            {/* Error pages */}
            <Route path="/500" component={InternalServer} />
            <Route path="*" component={NotFound} />
          </Switch>
          <Footer />
        </UserProvider>
      </div>
    </Router>
  );
};

export default App;
