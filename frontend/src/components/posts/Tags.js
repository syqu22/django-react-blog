import React from "react";
import PropTypes from "prop-types";

const Tags = ({ values }) => {
  return (
    <div className="tags">
      {values.map((value) => {
        return (
          <p className="tag" key={value.id}>
            {value.name}
          </p>
        );
      })}
    </div>
  );
};

Tags.propTypes = {
  values: PropTypes.array,
};

export default Tags;
