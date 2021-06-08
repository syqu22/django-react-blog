import React from "react";
import { Link } from "react-router-dom";
import Tags from "./Tags";

const MinimalPost = ({ slug, thumbnail_url, title, created_at, tags }) => {
  const date = new Date(created_at).toLocaleDateString();

  return (
    <Link to={`/post/${slug}`} className="item">
      <img src={thumbnail_url} />
      <span>{date}</span>
      <h2>{title}</h2>
      <Tags values={tags} />
    </Link>
  );
};

export default MinimalPost;
