import React, { useContext } from "react";
import { UserContext } from "../providers/UserContext";
import { NavLink } from "react-router-dom";

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
        {user !== null ? (
          <>
            <li>
              <NavLink className="navbar-item" to="/user">
                Logged as <b>{user.username}</b>
              </NavLink>
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
