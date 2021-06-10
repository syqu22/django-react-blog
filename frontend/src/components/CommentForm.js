import React, { useState, useEffect } from "react";

const CommentForm = ({ slug }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, email, body }),
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
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
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
      <label htmlFor="email">E-Mail</label>
      <input
        type="email"
        value={email}
        id="email"
        onChange={(e) => {
          setEmail(e.target.value);
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
  );
};

export default CommentForm;
