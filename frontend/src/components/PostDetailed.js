import React, { useState, useEffect } from "react";
import NotFound from "./errors/NotFound";
import Tags from "./Tags";

const PostDetailed = (props) => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const slug = props.location.pathname.split("/")[2];

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setError(true);
        }
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderPost = () => {
    const date = new Date(post.created_at).toLocaleString();

    return (
      <div className="post">
        <div
          className="post-header"
          style={{ backgroundImage: `url("${post.thumbnail_url}")` }}
        >
          <h1>{post.title}</h1>
          <div className="post-info">
            <p>{date}</p>
            <p>Created by: {post.author}</p>
            <p>Average read time: {post.read_time} minutes</p>
          </div>
        </div>
        <div className="post-body">
          <p>{post.body}</p>
          <Tags values={post.tags} />
        </div>
        <div className="post-comments">
          <p>Comments:</p>
          {post.comments}
        </div>
      </div>
    );
  };

  if (error) {
    return <NotFound />;
  }

  return <>{!isLoading ? renderPost() : ""}</>;
};

export default PostDetailed;
