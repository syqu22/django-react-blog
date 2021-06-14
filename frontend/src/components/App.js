import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import PostDetail from "./PostDetail";
import Posts from "./Posts";
import Contact from "./Contact";
import NavBar from "./NavBar";
import NotFound from "./errors/NotFound";
import InternalServer from "./errors/InternalServer";
import Footer from "./Footer";
import Signup from "./Signup";
import Login from "./Login";
import Logout from "./Logout";

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/posts" component={Posts} />
          <Route path="/contact" component={Contact} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
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
