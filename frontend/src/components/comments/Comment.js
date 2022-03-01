import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

const Comment = ({ values }) => {
  const formatDate = (date) => {
    return moment(date).fromNow();
  };

  return (
    <div className="comment">
      <div className="left-item">
        <img src={values.author.avatar} className="avatar" />
        <span>{values.author.username}</span>
        {values.author.is_staff ? <b>Staff Member</b> : <b>User</b>}
        <p>{formatDate(values.created_at)}</p>
      </div>
      <div className="right-item">{values.body}</div>
    </div>
  );
};

Comment.propTypes = {
  values: PropTypes.object,
};

export default Comment;
