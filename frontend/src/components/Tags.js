import React from "react";

const Tags = ({ values }) => {
  return (
    <div className="tags">
      {values.map((value) => {
        return (
          <p className="tag" key={value}>
            {value}
          </p>
        );
      })}
    </div>
  );
};

export default Tags;
