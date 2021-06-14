import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Socials from "./Socials";

const NavBar = () => {
  const [windowDimension, setWindowDimension] = useState(null);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 600;

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
        {isMobile & <li>Test</li>}
      </ul>
    </nav>
  );
};

export default NavBar;
