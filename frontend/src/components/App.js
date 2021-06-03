import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MinimalPost from "./MinimalPost";
import Post from "./Post";
import AboutMe from "./AboutMe";
import Projects from "./Projects";
import Contact from "./Contact";
import NavBar from "./NavBar";

const App = () => {
  const title = "Personal Blog";
  const [page, setPage] = useState(1);
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setPostsList(data));
  }, []);

  const renderHomePage = () => {
    return (
      <div className="home-page">
        <h3>Recent Posts</h3>
        <div className="posts-list">
          {postsList.map((post) => (
            <MinimalPost key={post.id} {...post} />
          ))}
        </div>
        <h1>Welcome</h1>
      </div>
    );
  };

  return (
    <Router>
      <div className="App">
        <h1 className="title">{title}</h1>
        <NavBar />
        <Switch>
          <Route exact path="/">
            {renderHomePage()}
          </Route>
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
