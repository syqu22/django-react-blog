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

  const renderNavBar = () => {
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
            <a className="navbar-item navbar-item-right" href="/admin">
              Login
            </a>
          </li>

          <Socials />
        </ul>
      </nav>
    );
  };

  const renderMobileNavBar = () => {
    return (
      <ul className="navbar">
        <NavLink to="/">
          <li className="navbar-item navbar-home">Home</li>
        </NavLink>
        <NavLink to="/posts">
          <li className="navbar-item">Posts</li>
        </NavLink>
        <NavLink to="/contact">
          <li className="navbar-item">Contact</li>
        </NavLink>
        <Socials />
      </ul>
    );
  };

  return <>{!isMobile ? renderNavBar() : renderMobileNavBar()}</>;
};

export default NavBar;
