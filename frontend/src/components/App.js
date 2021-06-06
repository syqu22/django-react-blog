import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import Post from "./Post";
import Posts from "./Posts";
import Contact from "./Contact";
import NavBar from "./NavBar";
import Socials from "./Socials";

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Socials />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/posts" component={Posts} />
          <Route path="/contact" component={Contact} />
          <Route path="/post/:slug" component={Post} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
