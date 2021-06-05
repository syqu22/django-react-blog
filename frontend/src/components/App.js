import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import Post from "./Post";
import Projects from "./Projects";
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
          <Route path="/post/:id" component={Post} />
          <Route path="/projects" component={Projects} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
