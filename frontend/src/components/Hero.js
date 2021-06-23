import React from "react";
import PropTypes from "prop-types";

const Hero = ({ children, image_url }) => {
  return (
    <div
      className="hero-image"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.6)),url(${image_url})`,
      }}
    >
      <div className="hero-text">{children}</div>
    </div>
  );
};

Hero.propTypes = {
  children: PropTypes.array,
  image_url: PropTypes.string,
};

export default Hero;
