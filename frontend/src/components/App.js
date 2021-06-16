import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserContext from "./UserContext";
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
import User from "./auth/User";

const App = () => {
  const [user, setUser] = useState({});
  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/posts" component={Posts} />
            <Route path="/contact" component={Contact} />
            <Route path="/user" component={User} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/post/:slug" component={PostDetail} />

            <Route path="/500" component={InternalServer} />
            <Route path="*" component={NotFound} />
          </Switch>
          <Footer />
        </UserContext.Provider>
      </div>
    </Router>
  );
};

export default App;
