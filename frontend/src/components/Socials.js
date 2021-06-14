import React from "react";
import { useLocation } from "react-router-dom";
import { GrFacebook, GrInstagram, GrTwitter } from "react-icons/gr";

const Socials = () => {
  const location = useLocation();
  const facebookURL = "https://www.facebook.com/";
  const instagramURL = "http://instagram.com/";
  const twitterURL = "https://twitter.com/";

  return (
    <div className="social navbar-item-right">
      <button
        onClick={() => {
          location.href = facebookURL;
        }}
        className="social-button"
      >
        <GrFacebook />
      </button>

      <button
        onClick={() => {
          location.href = instagramURL;
        }}
        className="social-button"
      >
        <GrInstagram />
      </button>
      <button
        onClick={() => {
          location.href = twitterURL;
        }}
        className="social-button"
      >
        <GrTwitter />
      </button>
    </div>
  );
};

export default Socials;
