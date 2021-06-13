import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PropTypes from "prop-types";

const Pagination = ({ page, maxPages, handleChange }) => {
  const handleArrow = (direction) => {
    switch (direction) {
      case "left":
        if (page - 1 >= 0) {
          handleChange(page - 1);
        }
        break;
      case "right":
        if (page + 1 < maxPages) {
          handleChange(page + 1);
        }
        break;
    }
  };

  const renderPageNumbers = () => {
    const numbers = [];

    for (let index = 0; index < maxPages; index++) {
      numbers.push(
        <span
          tabIndex={0}
          className={page === index ? "disabled" : "enabled"}
          onClick={() => handleChange(index)}
          key={index}
        >
          {index + 1}
        </span>
      );
    }
    return numbers;
  };

  return (
    maxPages > 1 && (
      <div className="pagination">
        <button onClick={() => handleArrow("left")} className={`arrow-button`}>
          <FaArrowLeft />
        </button>

        <div className="pagination-numbers">{renderPageNumbers()}</div>

        <button onClick={() => handleArrow("right")} className={`arrow-button`}>
          <FaArrowRight />
        </button>
      </div>
    )
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  maxPages: PropTypes.number,
  handleChange: PropTypes.func,
};

export default Pagination;
