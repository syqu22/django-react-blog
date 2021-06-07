import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import PostDetailed from "./PostDetailed";
import Posts from "./Posts";
import Contact from "./Contact";
import NavBar from "./NavBar";

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/posts" component={Posts} />
          <Route path="/contact" component={Contact} />
          <Route path="/post/:slug" component={PostDetailed} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
