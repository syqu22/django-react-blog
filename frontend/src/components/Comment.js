import React from "react";
import moment from "moment";

const Comment = ({ values }) => {
  const formatDate = (date) => {
    return moment(date).fromNow();
  };

  return (
    <div className="comment">
      <div className="left-item">
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          className="avatar"
        />
        <span>{values.author}</span>
        <p>{formatDate(values.created_at)}</p>
      </div>
      <div className="right-item">{values.body}</div>
    </div>
  );
};

export default Comment;
