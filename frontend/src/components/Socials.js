import React from "react";
import { GrFacebook, GrInstagram, GrTwitter } from "react-icons/gr";

const Socials = () => {
  return (
    <div className="social">
      <button className="social-button">
        <GrFacebook />
      </button>
      <button className="social-button">
        <GrInstagram />
      </button>
      <button className="social-button">
        <GrTwitter />
      </button>
    </div>
  );
};

export default Socials;
