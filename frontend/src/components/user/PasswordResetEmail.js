import React, { useState } from "react";
import connection from "../../connection";

const initialData = Object.freeze({
  email: "",
});

const PasswordResetEmail = () => {
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    connection.post(`user/password/reset/${formData.email}/`).catch((err) => {
      setError(err.response.data);
      console.log(err.message);
    });
  };

  return (
    <div className="user-container-single">
      <form className="user-form-item" onSubmit={handleSubmit} noValidate>
        <h1>Password reset</h1>
        <label htmlFor="email">
          Your email
          {error.detail && (
            <span className="invalid-value"> {error.detail} </span>
          )}
          {error.email && (
            <span className="invalid-value"> {error.email} </span>
          )}
        </label>
        <input
          required
          onChange={handleChange}
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          style={
            error.email
              ? { borderColor: "var(--danger)" }
              : { borderColor: "var(--secondary)" }
          }
        />
        <button className="animated-button" type="submit">
          <span>
            <strong>Send email</strong>
          </span>
        </button>
      </form>
    </div>
  );
};

export default PasswordResetEmail;
