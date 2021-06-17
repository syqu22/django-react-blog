import React, { useEffect, useContext } from "react";
import { UserContext } from "../../providers/UserContext";
import { useHistory } from "react-router-dom";
import connection from "../../connection";

const Logout = () => {
  const { fetchUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    connection
      .post("user/logout/", {
        refresh_token: localStorage.getItem("refresh_token"),
      })
      .then(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        connection.defaults.headers["Authorization"] = null;
        fetchUser();
        history.push("/");
      })
      .catch((err) => console.log(err.message));
  }, []);

  return <h3 className="error">Logging Out</h3>;
};

export default Logout;
