import React, { useState } from "react";
import connection from "../../connection";

const DeleteAccountForm = () => {
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    connection
      .post("user/delete/")
      .then(() => {
        console.log("Please confirm account removal by email");
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err.message);
      });
  };

  return (
    <form className="user-item" onSubmit={handleSubmit} noValidate>
      {error.detail && <span className="invalid-value">{error.detail}</span>}
      <button className="animated-button" type="submit">
        <span>
          <strong>Disable Account</strong>
        </span>
      </button>
    </form>
  );
};

export default DeleteAccountForm;
