import React from "react";
import moment from "moment";

const Comments = ({ values }) => {
  const formatDate = (date) => {
    return moment(date).fromNow();
  };

  return (
    <div className="comments">
      {values.map((value) => {
        return (
          <div className="comment" key={value.id}>
            <p>Title: {value.title}</p>
            <p>Author: {value.author || value.email}</p>
            <p>Date: {formatDate(value.created_at)}</p>
            <p>Body: {value.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
