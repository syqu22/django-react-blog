import React, { useState, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";

const Comments = ({ slug }) => {
  const [data, setdata] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/posts/${slug}/comments`)
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err.message));
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
