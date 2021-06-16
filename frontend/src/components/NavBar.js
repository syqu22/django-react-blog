import React from "react";
import { NavLink } from "react-router-dom";
import Socials from "./Socials";

const NavBar = () => {
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
        <Socials />
      </ul>
    </nav>
  );
};

export default NavBar;
