import React, { useState, useEffect } from "react";
import moment from "moment";

const Comments = ({ slug }) => {
  const [data, setdata] = useState(null);

  useEffect(() => {
    fetch(`/api/posts/${slug}/comments`)
      .then((res) => res.json())
      .then((data) => setdata(data));
  }, []);

  const formatDate = (date) => {
    return moment(date).fromNow();
  };

  if (!data) {
    return null;
  }

  return (
    <div className="comments">
      {data.map((value) => {
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
