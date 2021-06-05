import React from "react";
import { Link } from "react-router-dom";

const MinimalPost = ({ slug, thumbnail_url, title, created_at }) => {
  const date = new Date(created_at).toLocaleDateString();

  return (
    <Link to={`/${slug}`}>
      <div className="minimal-post">
        <img src={thumbnail_url} />
        <p>{date}</p>
        <h2>{title}</h2>
      </div>
    </Link>
  );
};

export default MinimalPost;
