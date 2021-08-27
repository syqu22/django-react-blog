import React, { useState } from "react";
import PersonalForm from "./PersonalForm";
import AvatarForm from "./AvatarForm";
import PasswordForm from "./PasswordForm";
import DeleteAccountForm from "./DeleteAccountForm";

const User = () => {
  const [tab, setTab] = useState(0);

  const tabHandle = (tab) => {
    switch (tab) {
      default:
        return <PersonalForm />;
      case 1:
        return <AvatarForm />;
      case 2:
        return <PasswordForm setTab={setTab} />;
      case 3:
        return <DeleteAccountForm />;
    }
  };

  return (
    <div className="user-container">
      <ul className="user-menu">
        <li tabIndex={0} onClick={() => setTab(0)}>
          Personal Informations
        </li>
        <li tabIndex={0} onClick={() => setTab(1)}>
          Avatar
        </li>
        <li tabIndex={0} onClick={() => setTab(2)}>
          Password
        </li>
        <li className="danger" tabIndex={0} onClick={() => setTab(3)}>
          Disable account
        </li>
      </ul>
      {tabHandle(tab)}
    </div>
  );
};

export default User;
