import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

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
        <a href="/admin">
          <li className="navbar-item navbar-item-right">Login</li>
        </a>
        <li className="navbar-search navbar-item-right">
          <SearchBar />
        </li>
      </ul>
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
      </ul>
    );
  };

  return <>{!isMobile ? renderNavBar() : renderMobileNavBar()}</>;
};

export default NavBar;
