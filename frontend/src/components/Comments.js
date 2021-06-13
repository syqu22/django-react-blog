import React, { useState, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";
import Pagination from "./Pagination";
import PropTypes from "prop-types";

const Comments = ({ slug }) => {
  const [commentsList, setCommentsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const commentsPerPage = 6;
  const maxComments = commentsList.length / commentsPerPage;

  useEffect(() => {
    axios
      .get(`/api/posts/${slug}/comments`)
      .then((res) => setCommentsList(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  if (!commentsList) {
    return <h1 className="error">No comments</h1>;
  }

  return (
    <>
      <div className="comments">
        {commentsList
          .slice(
            currentPage * commentsPerPage,
            currentPage * commentsPerPage + commentsPerPage
          )
          .map((comment) => {
            return <Comment key={comment.id} values={comment} />;
          })}
      </div>
      <Pagination
        page={currentPage}
        maxPages={maxComments}
        handleChange={setCurrentPage}
      />
    </>
  );
};

Comments.propTypes = {
  slug: PropTypes.string,
};

export default Comments;
