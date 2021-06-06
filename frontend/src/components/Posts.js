import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Posts = () => {
  const [canLeft, setLeft] = useState(false);
  const [canRight, setRight] = useState(false);

  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch("/api/posts")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setPostsList(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Pagination logic
    if (page - 1 < 1) {
      setLeft(false);
    } else {
      setLeft(true);
    }
    if (page + 3 >= postsList.length) {
      setRight(false);
    } else {
      setRight(true);
    }
  }, [page]);

  return <p>Hello World</p>;
};

export default Posts;
