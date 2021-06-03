import React from "react";
import PostMinimal from "./PostMinimal";
import NavBar from "./NavBar";

const App = () => {
  const title = "Hello";
  return (
    <div className="App">
      <h1 className="title">{title}</h1>
      <NavBar />
      <div className="posts-list">
        <PostMinimal />
        <PostMinimal />
        <PostMinimal />
        <PostMinimal />
        <PostMinimal />
        <PostMinimal />
        <PostMinimal />
      </div>
    </div>
  );
};

export default App;
