import React, { useContext } from "react";
import { UserContext } from "../providers/UserContext";
import { NavLink } from "react-router-dom";
import Socials from "./Socials";

const NavBar = () => {
  const { user } = useContext(UserContext);

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
        <Socials />
        {user !== null ? (
          <>
            <li>
              <div>
                Logged as <b>{user.username}</b>
              </div>
            </li>
            <li>
              <NavLink className="navbar-item" to="/logout">
                Log Out
              </NavLink>
            </li>
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
