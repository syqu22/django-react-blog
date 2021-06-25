import React, { useContext } from "react";
import { UserContext } from "../../providers/UserContext";

const PersonalForm = () => {
  const { user } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="user-item" onSubmit={handleSubmit} noValidate>
      <h1>Personal Informations</h1>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder={user.username}
      />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" placeholder={user.email} />
      <label htmlFor="first_name">First Name</label>
      <input
        type="text"
        id="first_name"
        name="first_name"
        placeholder={user.first_name}
      />
      <label htmlFor="last_name">Last Name</label>
      <input
        type="text"
        id="last_name"
        name="last_name"
        placeholder={user.last_name}
      />
      <button className="animated-button" type="submit">
        <span>Update Informations</span>
      </button>
    </form>
  );
};

export default PersonalForm;
