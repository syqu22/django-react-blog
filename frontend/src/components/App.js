import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import Post from "./Post";
import AboutMe from "./AboutMe";
import Projects from "./Projects";
import Contact from "./Contact";
import NavBar from "./NavBar";

const App = () => {
  const title = "Hello Blog";

  return (
    <Router>
      <div className="App">
        <h1 className="title">{title}</h1>
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/post/:id" component={Post} />
          <Route path="/about-me" component={AboutMe} />
          <Route path="/projects" component={Projects} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
