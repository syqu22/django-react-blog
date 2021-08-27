import React, { useEffect, useState, useContext } from "react";
import connection from "../../connection";
import { UserContext } from "../../providers/UserContext";

const DeleteAccount = () => {
  const { fetchUser } = useContext(UserContext);
  const [error, setError] = useState({});
  const uid = location.pathname.split("/")[2];
  const token = location.pathname.split("/")[3];

  useEffect(() => {
    connection
      .post(`user/delete/${uid}/${token}/`)
      .then(() => fetchUser())
      .catch((err) => {
        setError(err.response.data);
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      {error.detail && <span className="invalid-value">{error.detail}</span>}
      <h1 className="search">Account successfully deleted.</h1>
    </div>
  );
};

export default DeleteAccount;
