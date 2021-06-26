import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers/UserContext";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = () => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const handleMobileMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "auto";
    }
  }, [open]);

  const renderDesktop = () => {
    return (
      <>
        <li>
          <NavLink className="navbar-item" exact to="/">
            <strong>Home</strong>
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
                User Panel
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
      </>
    );
  };

  return (
    <>
      <nav>
        <ul className="navbar">
          <li>
            <img
              src={window.location.origin + "/media/logo.svg"}
              className="logo"
            />
          </li>
          {isMobile ? (
            <button className="navbar-hamburger" onClick={() => setOpen(!open)}>
              <GiHamburgerMenu
                style={{ fill: open ? "var(--primary)" : "var(--secondary)" }}
              />
            </button>
          ) : (
            renderDesktop()
          )}
        </ul>
      </nav>
      {isMobile && (
        <div
          className="navbar-mobile"
          style={{
            transform: open ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <ul className="navbar-mobile-items">
            <li onClick={handleMobileMenu}>
              <NavLink className="mobile-link" exact to="/">
                <strong>Home</strong>
              </NavLink>
            </li>
            {user !== null ? (
              <>
                <li onClick={handleMobileMenu}>
                  <NavLink className="mobile-link" to="/posts">
                    Posts
                  </NavLink>
                </li>
                <li onClick={handleMobileMenu}>
                  <NavLink className="mobile-link" to="/user">
                    User Panel
                  </NavLink>
                </li>
                <li onClick={handleMobileMenu}>
                  <NavLink className="mobile-link" to="/logout">
                    Log Out
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li onClick={handleMobileMenu}>
                  <NavLink className="mobile-link" to="/signup">
                    Sign Up
                  </NavLink>
                </li>
                <li onClick={handleMobileMenu}>
                  <NavLink className="mobile-link" to="/login">
                    Log In
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default NavBar;
