import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MinimalPost from "./MinimalPost";
import SearchBar from "./SearchBar";

const Posts = () => {
  const [postsList, setPostsList] = useState([]);
  const [maxPages, setMaxPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [canLeft, setLeft] = useState(false);
  const [canRight, setRight] = useState(false);

  const postsPerPage = 4;

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
          setMaxPages(Math.ceil(data.length / postsPerPage));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (currentPage + 1 < maxPages) {
      setRight(true);
    } else {
      setRight(false);
    }
    if (currentPage <= 0) {
      setLeft(false);
    } else {
      setLeft(true);
    }
  }, [currentPage, maxPages]);

  const renderPageNumbers = () => {
    const numbers = [];
    for (let index = 0; index < maxPages; index++) {
      numbers.push(
        <span
          className={currentPage === index ? "active" : "inactive"}
          onClick={() => {
            setCurrentPage(index);
          }}
          key={index}
        >
          {index + 1}
        </span>
      );
    }
    return numbers;
  };

  const renderPagination = () => {
    return (
      <div className="pagination">
        <button
          onClick={() => {
            canLeft && setCurrentPage(currentPage - 1);
          }}
          className={`arrow-button ${!canLeft && "inactive"}`}
        >
          <FaArrowLeft />
        </button>

        <div className="pagination-numbers">{renderPageNumbers()}</div>

        <button
          onClick={() => {
            canRight && setCurrentPage(currentPage + 1);
          }}
          className={`arrow-button ${!canRight && "inactive"}`}
        >
          <FaArrowRight />
        </button>
      </div>
    );
  };

  return (
    <>
      <SearchBar />
      {maxPages > 1 && renderPagination()}
      <div className="container">
        {postsList
          .slice(
            currentPage * postsPerPage,
            currentPage * postsPerPage + postsPerPage
          )
          .map((post) => (
            <MinimalPost key={post.slug} {...post} />
          ))}
      </div>
    </>
  );
};

export default Posts;
