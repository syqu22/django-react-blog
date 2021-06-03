import React, { useState, useEffect } from "react";

const Post = (props) => {
  const [post, setPost] = useState("");

  const id = props.location.pathname.split("/")[2];

  useEffect(() => {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, []);

  return (
    <div className="post">
      <p>Post</p>
      <p>{post.id}</p>
      <p>{post.title}</p>
      <p>{post.description}</p>
      <p>{post.author}</p>
      <p>{post.thumbnail_url}</p>
      <p>{post.body}</p>
      <p>{post.tags}</p>
      <p>{post.created_at}</p>
      <p>{post.comments}</p>
    </div>
  );
};

export default Post;
