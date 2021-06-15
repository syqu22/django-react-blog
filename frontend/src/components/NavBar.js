import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import connection from "../connection";
import Socials from "./Socials";

const NavBar = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    connection
      .get("user/")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <nav>
      <ul className="navbar">
        <li>
          <NavLink className="navbar-item navbar-home" exact to="/">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink className="navbar-item" to="/posts">
            Posts
          </NavLink>
        </li>

        <li>
          <NavLink className="navbar-item" to="/contact">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar-item" to="/signup">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar-item" to="/login">
            Log In
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar-item" to="/logout">
            Log Out
          </NavLink>
        </li>
        <li>{user.username}</li>
        <Socials />
      </ul>
    </nav>
  );
};

export default NavBar;
