import React from "react";

function DisableForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="user-item" onSubmit={handleSubmit} noValidate>
      <button className="animated-button" type="submit">
        <span>Disable Account</span>
      </button>
    </form>
  );
}

export default DisableForm;
