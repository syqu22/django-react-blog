import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import PostDetail from "./posts/PostDetail";
import Posts from "./posts/Posts";
import Contact from "./Contact";
import NavBar from "./NavBar";
import NotFound from "./errors/NotFound";
import InternalServer from "./errors/InternalServer";
import Footer from "./Footer";
import SignUp from "./auth/SignUp";
import LogIn from "./auth/LogIn";
import LogOut from "./auth/LogOut";

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/posts" component={Posts} />
          <Route path="/contact" component={Contact} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LogIn} />
          <Route path="/logout" component={LogOut} />
          <Route path="/post/:slug" component={PostDetail} />

          <Route path="/500" component={InternalServer} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
