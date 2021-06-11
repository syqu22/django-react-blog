import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentForm = ({ slug }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [commentCreated, setCommentCreated] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    clearState();
    setError({});
  }, [commentCreated]);

  const clearState = () => {
    setTitle("");
    setAuthor("");
    setBody("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`/api/posts/${slug}/comments`, {
        title,
        author,
        body,
      })
      .then(() => setCommentCreated(true))
      .catch((err) => {
        setError(err.response.data);
        console.log(err.message);
      });
  };

  return (
    <>
      {commentCreated && (
        <>
          <p className="new-comment">
            Comment successfully created! Waiting for verification, It might
            take some time.
          </p>
        </>
      )}
      <form className="comment-form" onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title <span className="invalid-value">{error.title}</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="author">
          Author (Optional){" "}
          <span className="invalid-value">{error.author}</span>
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label htmlFor="body">
          Content <span className="invalid-value">{error.body}</span>
        </label>
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
        />
        <p className="info">{body.length} / 255</p>
        <button className="comment-form-button" type="submit">
          <span>Send Comment</span>
        </button>
      </form>
    </>
  );
};

export default CommentForm;
