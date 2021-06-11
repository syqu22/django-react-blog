import React, { useState } from "react";

const CommentForm = ({ slug }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [comment, setComment] = useState(null);

  const clearState = () => {
    setTitle("");
    setAuthor("");
    setBody("");
  };

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
      .then((data) => setComment(data))
      .then(clearState())
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {comment && (
        <>
          <p className="new-comment">
            Comment successfully created! Waiting for verification
          </p>
        </>
      )}
      <form className="comment-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="author">Author (Optional)</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label htmlFor="body">Content</label>
        <textarea
          value={body}
          id="body"
          onChange={(e) => {
            e.target.style.height = "inherit";
            e.target.style.height = `${e.target.scrollHeight}px`;
            setBody(e.target.value);
          }}
          maxLength="255"
          rows={4}
        />{" "}
        <p className="info">{body.length} / 255</p>
        <button type="submit">Post Comment</button>
      </form>
      )
    </>
  );
};

export default CommentForm;
