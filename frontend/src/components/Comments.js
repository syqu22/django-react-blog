import React, { useState, useEffect } from "react";
import Comment from "./Comment";

const Comments = ({ slug }) => {
  const [data, setdata] = useState(null);

  useEffect(() => {
    fetch(`/api/posts/${slug}/comments`)
      .then((res) => res.json())
      .then((data) => setdata(data));
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div className="comments">
      {data.map((comment) => {
        return <Comment key={comment.id} values={comment} />;
      })}
    </div>
  );
};

export default Comments;
