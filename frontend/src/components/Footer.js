import React from "react";
import { Link } from "react-router-dom";
import Socials from "./Socials";

const Footer = () => {
  return (
    <div className="footer">
      <footer>
        <div>
          Blog@2022 by <a href="https://github.com/syqu22">Syqu22</a>
        </div>
        <div>
          <Link to="/sitemap">Sitemap</Link>
        </div>
        <div>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
        <div>
          <Link to="/terms">Terms of Use</Link>
        </div>
        <div>
          <Link to="/license">License</Link>
        </div>
        <Socials />
      </footer>
    </div>
  );
};

export default Footer;
