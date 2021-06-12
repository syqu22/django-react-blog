import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import MinimalPost from "./MinimalPost";
import SearchBar from "./SearchBar";

const Posts = () => {
  const [postsList, setPostsList] = useState([]);
  const [maxPages, setMaxPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const postsPerPage = 4;

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((res) => {
        setPostsList(res.data);
        setMaxPages(Math.ceil(res.data.length / postsPerPage));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    // Pagination during search
    let query = postsList.filter((e) => e.title.match(search));
    setMaxPages(Math.ceil(query.length / postsPerPage));
  }, [search]);

  const queryFilter = (value) => {
    return value.title.match(search) || value.tags.includes(search);
  };

  const renderPageNumbers = () => {
    const numbers = [];

    for (let index = 0; index < maxPages; index++) {
      numbers.push(
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
    return numbers;
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

  const handleArrow = (direction) => {
    if (direction === "left") {
      if (currentPage - 1 < 0) {
      } else {
        setCurrentPage(currentPage - 1);
      }
    } else if (direction === "right") {
      if (currentPage + 1 >= maxPages) {
      } else {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  return (
    <>
      <SearchBar callback={setSearch} />
      {maxPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handleArrow("left")}
            className={`arrow-button`}
          >
            <FaArrowLeft />
          </button>

          <div className="pagination-numbers">{renderPageNumbers()}</div>

          <button
            onClick={() => handleArrow("right")}
            className={`arrow-button`}
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
