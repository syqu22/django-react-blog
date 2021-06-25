import React from "react";
import { Link } from "react-router-dom";
import Tags from "./Tags";
import PropTypes from "prop-types";

const MinimalPost = ({
  slug,
  thumbnail_url,
  title,
  created_at,
  tags,
  author,
}) => {
  const date = new Date(created_at).toLocaleDateString();

  return (
    <Link to={`/post/${slug}/`} className="item">
      <img src={thumbnail} />
      <span>{date}</span>
      <h2>{title}</h2>
      <span>
        by {author.first_name} {author.last_name}
      </span>
      <Tags values={tags} />
    </Link>
  );
};

MinimalPost.propTypes = {
  slug: PropTypes.string,
  thumbnail_url: PropTypes.string,
  title: PropTypes.string,
  created_at: PropTypes.string,
  tags: PropTypes.array,
  author: PropTypes.object,
};

export default MinimalPost;
