import React from "react";

const PasswordForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="user-item" onSubmit={handleSubmit} noValidate>
      <input type="text" autoComplete="username" hidden />
      <h1>Password</h1>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        autoComplete="password"
      />
      <label htmlFor="password">New Password</label>
      <input
        type="password"
        id="password2"
        name="password2"
        autoComplete="new-password"
      />
      <button className="animated-button" type="submit">
        <span>Change password</span>
      </button>
    </form>
  );
};

export default PasswordForm;
