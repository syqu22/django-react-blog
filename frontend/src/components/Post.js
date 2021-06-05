import React, { useState, useEffect } from "react";

const Post = (props) => {
  const [post, setPost] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const id = props.location.pathname.split("/")[2];

  useEffect(() => {
    fetch(`/api/posts/${id}`)
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
        <p>{post.body}</p>
        <p>{post.tags}</p>
        {post.comments}
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

  return <div>{!isLoading ? renderPost() : ""}</div>;
};

export default Post;
