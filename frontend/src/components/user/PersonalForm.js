import React, { useContext, useEffect, useState } from "react";
import connection from "../../connection";
import { UserContext } from "../../providers/UserContext";
import { useHistory } from "react-router-dom";

const initialData = Object.freeze({
  username: "",
  email: "",
  first_name: "",
  last_name: "",
});

const PersonalForm = () => {
  const { user, fetchUser } = useContext(UserContext);
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState({});
  const [countdown, setCountdown] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const tooManyRequests = error["Too Many Requests"];

    if (tooManyRequests) {
      setCountdown(parseInt(tooManyRequests.split(" ")[2], 10));
    }
  }, [error]);

  useEffect(() => {
    if (countdown > 0) {
      let timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    connection
      .post(`user/details/`, {
        username: formData.username,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
      })
      .then(() => {
        fetchUser();
        setFormData(initialData);
        history.push("/");
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err.message);
      });
  };

  return (
    <form className="user-item" onSubmit={handleSubmit} noValidate>
      <h1>Personal Informations</h1>
      {countdown > 0 && (
        <p className="countdown">
          Please wait {countdown} seconds before trying again.
        </p>
      )}
      <label htmlFor="username">
        Username
        {error.detail && (
          <span className="invalid-value"> {error.detail} </span>
        )}
        {error.username && (
          <span className="invalid-value"> {error.username} </span>
        )}
      </label>
      <input
        onChange={handleChange}
        type="text"
        id="username"
        name="username"
        placeholder={user.username}
        style={
          error.username
            ? { borderColor: "var(--danger)" }
            : { borderColor: "var(--secondary)" }
        }
      />
      <label htmlFor="email">
        Email
        {error.email && <span className="invalid-value"> {error.email} </span>}
      </label>
      <input
        onChange={handleChange}
        type="email"
        id="email"
        name="email"
        placeholder={user.email}
        style={
          error.email
            ? { borderColor: "var(--danger)" }
            : { borderColor: "var(--secondary)" }
        }
      />
      <label htmlFor="first_name">
        First Name
        {error.first_name && (
          <span className="invalid-value"> {error.first_name} </span>
        )}
      </label>
      <input
        onChange={handleChange}
        type="text"
        id="first_name"
        name="first_name"
        placeholder={user.first_name}
        style={
          error.first_name
            ? { borderColor: "var(--danger)" }
            : { borderColor: "var(--secondary)" }
        }
      />
      <label htmlFor="last_name">
        Last Name
        {error.last_name && (
          <span className="invalid-value"> {error.last_name} </span>
        )}
      </label>
      <input
        onChange={handleChange}
        type="text"
        id="last_name"
        name="last_name"
        placeholder={user.last_name}
        style={
          error.last_name
            ? { borderColor: "var(--danger)" }
            : { borderColor: "var(--secondary)" }
        }
      />
      <button className="animated-button" type="submit">
        <span>
          <strong>Confirm</strong>
        </span>
      </button>
    </form>
  );
};

export default PersonalForm;
