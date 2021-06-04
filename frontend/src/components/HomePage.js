import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import MinimalPost from "./MinimalPost";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IconContext } from "react-icons";

const HomePage = () => {
  const [postsList, setPostsList] = useState([]);
  const [page, setPage] = useState(4);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setPostsList(data));
  }, []);

  return (
    <div className="home-page">
      <label className="recent">Recent Posts</label>
      <div className="posts-list">
        <button
          onClick={() => {
            setPage(page - 1);
          }}
          className="arrow-button inactive"
        >
          <FaArrowLeft />
        </button>

        {postsList.slice(page - 4, page).map((post) => (
          <MinimalPost key={post.id} {...post} />
        ))}
        <button
          onClick={() => {
            setPage(page + 1);
          }}
          className="arrow-button"
        >
          <FaArrowRight />
        </button>
      </div>
      <Hero />
    </div>
  );
};

export default HomePage;
