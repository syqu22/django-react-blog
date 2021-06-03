import React, { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState();

  return (
    <form>
      <label htmlFor="search-form">Search: </label>
      <input
        type="text"
        id="search-form"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </form>
  );
};

export default SearchBar;
