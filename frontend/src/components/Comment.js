import React from "react";
import moment from "moment";

const Comment = ({ values }) => {
  const formatDate = (date) => {
    return moment(date).fromNow();
  };

  return (
    <div className="comment">
      <img
        src="https://www.w3schools.com/howto/img_avatar.png"
        className="avatar"
      />
      <p>Title: {values.title}</p>
      <p>Author: {values.author}</p>
      <p>Date: {formatDate(values.created_at)}</p>
      <p>Body: {values.body}</p>
    </div>
  );
};

export default Comment;
