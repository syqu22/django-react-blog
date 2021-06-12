import React, { useState, useEffect } from "react";
import axios from "axios";
import MinimalPost from "./MinimalPost";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

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
    let query = postsList.filter((e) => e.title.match(search));
    setMaxPages(Math.ceil(query.length / postsPerPage));
    // Swap to first page to make sure we won't be stuck on any page without items
    setCurrentPage(0);
  }, [search]);

  const queryFilter = (value) => {
    return value.title.match(search) || value.tags.includes(search);
  };

  return (
    <>
      <SearchBar callback={setSearch} />
      <Pagination
        page={currentPage}
        maxPages={maxPages}
        handleChange={setCurrentPage}
      />
      <div className="container">
        {postsList
          .filter(queryFilter)
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
