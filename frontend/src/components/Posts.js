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
  const [search, setSearch] = useState("");

  const postsPerPage = 6;

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Http error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPostsList(data);
        setMaxPages(Math.ceil(data.length / postsPerPage));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Pagination
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

  useEffect(() => {
    // Pagination during search
    let query = postsList.filter((e) => e.title.match(search));
    setMaxPages(Math.ceil(query.length / postsPerPage));
  }, [search]);

  const queryFilter = (value) => {
    return value.title.match(search) || value.tags.includes(search);
  };

  const renderPageNumbers = () => {
    for (let index = 0; index < maxPages; index++) {
      return (
        <span
          className={currentPage === index ? "disabled" : "enabled"}
          onClick={() => {
            setCurrentPage(index);
          }}
          key={index}
        >
          {index + 1}
        </span>
      );
    }
  };

  const showPosts = (post) => {
    return <MinimalPost key={post.slug} {...post} />;
  };

  const renderPosts = () => {
    return (
      <div className="container">
        {postsList
          .filter(queryFilter)
          .slice(
            currentPage * postsPerPage,
            currentPage * postsPerPage + postsPerPage
          )
          .map(showPosts)}
      </div>
    );
  };

  return (
    <>
      <SearchBar callback={setSearch} />
      {maxPages > 1 && (
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
      )}
      {renderPosts()}
    </>
  );
};

export default Posts;
