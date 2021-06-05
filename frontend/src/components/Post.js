import React, { useState, useEffect } from "react";

const Post = (props) => {
  const [post, setPost] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const slug = props.location.pathname.split("/")[1];

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setError("Post not found");
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
        <img src={post.thumbnail_url} />
        <div className="post-header">
          <h1>{post.title}</h1>
          <h2>{post.description}</h2>
          <p>{date}</p>
          <p>{post.author}</p>
        </div>
        <div className="post-body">
          <p>{post.body}</p>
          <p>{post.tags}</p>
        </div>
        <div className="post-comments">
          <p>Comments:</p>
          {post.comments}
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="error">
        <h1>{error}</h1>
      </div>
    );
  }

  return <>{!isLoading ? renderPost() : ""}</>;
};

export default Post;
