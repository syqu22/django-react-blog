import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

const NavBar = () => {
  return (
    <ul className="navbar">
      <NavLink to="/">
        <li className="navbar-item navbar-home">Home</li>
      </NavLink>
      <NavLink to="/about-me">
        <li className="navbar-item">About Me</li>
      </NavLink>
      <NavLink to="/projects">
        <li className="navbar-item">Projects</li>
      </NavLink>
      <NavLink to="/contact">
        <li className="navbar-item">Contact</li>
      </NavLink>
      <a href="/admin">
        <li className="navbar-item navbar-item-right">Login</li>
      </a>
      <li className="navbar-search navbar-item-right">
        <SearchBar />
      </li>
    </ul>
  );
};

export default NavBar;
