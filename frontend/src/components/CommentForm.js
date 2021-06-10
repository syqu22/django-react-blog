import React, { useState, useEffect } from "react";
import Comment from "./Comment";

const CommentForm = ({ slug }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [comment, setComment] = useState(null);

  const handleSubmit = (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, body }),
    };
    e.preventDefault();

    fetch(`/api/posts/${slug}/comments`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Http error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setComment(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form className="comment-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        <label htmlFor="body">Content</label>
        <textarea
          value={body}
          id="body"
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <button type="submit">Create</button>
      </form>
      {comment && (
        <>
          <p>Comment created! Waiting for verification</p>
          <Comment values={comment} />
        </>
      )}
    </>
  );
};

export default CommentForm;
