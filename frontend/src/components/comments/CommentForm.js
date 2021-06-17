import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import connection from "../../connection";

const initialData = Object.freeze({
  body: "",
});

const CommentForm = ({ slug }) => {
  const [formData, setFormData] = useState(initialData);
  const [commentCreated, setCommentCreated] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState({});

  useEffect(() => {
    clearState();
    setError({});
  }, [commentCreated]);

  useEffect(() => {
    countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000);
  }, [countdown]);

  useEffect(() => {
    const tooManyRequests = error["Too Many Requests"];

    if (tooManyRequests) {
      setCountdown(tooManyRequests.split(" ")[2]);
    }
  }, [error]);

  const handleChange = (e) => {
    (e.target.style.height = "inherit"),
      (e.target.style.height = `${e.target.scrollHeight}px`),
      setFormData({
        ...formData,
        [e.target.name]: e.target.value.trim(),
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setCommentCreated(false);
    }, 5000);
  }, [commentCreated]);

  const clearState = () => {
    setFormData(initialData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    connection
      .post(`comments/${slug}/send/`, {
        body: formData.body,
      })
      .then(() => setCommentCreated(true))
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <>
      {commentCreated && (
        <>
          <p className="new-comment">Comment successfully created!</p>
        </>
      )}

      {countdown > 0 && (
        <p className="comment-countdown">
          Please wait {countdown} seconds before posting another comment.
        </p>
      )}
      <form className="comment-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="body">
          {error.body && <span className="invalid-value">{error.body}</span>}
          {error.detail && (
            <span className="invalid-value">{error.detail}</span>
          )}
        </label>
        <textarea
          id="body"
          name="body"
          onChange={handleChange}
          placeholder="Write your own comment here..."
          maxLength="255"
          rows={4}
        />
        <p className="info">{formData.body.length} / 255</p>
        <button className="animated-button" type="submit">
          <span>Comment</span>
        </button>
      </form>
    </>
  );
};

CommentForm.propTypes = {
  slug: PropTypes.string,
};

export default CommentForm;
