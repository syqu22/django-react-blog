import React, { useState } from "react";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const [test, setTest] = useState("#");

  return (
    <ul className="navbar">
      <li
        className="navbar-item navbar-home"
        onClick={() => {
          setTest("#");
        }}
      >
        {test}
      </li>
      <li
        className="navbar-item"
        onClick={() => {
          setTest("1");
        }}
      >
        About Me
      </li>
      <li
        className="navbar-item"
        onClick={() => {
          setTest("2");
        }}
      >
        Projects
      </li>
      <li
        className="navbar-item"
        onClick={() => {
          setTest("3");
        }}
      >
        Contact
      </li>
      <li
        className="navbar-item navbar-item-right"
        onClick={() => {
          setTest(4);
        }}
      >
        Admin
      </li>
      <li className="navbar-search navbar-item-right">
        <SearchBar />
      </li>
    </ul>
  );
};

export default NavBar;
