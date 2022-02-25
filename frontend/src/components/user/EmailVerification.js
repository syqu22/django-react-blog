import React, { useEffect, useState } from "react";
import connection from "../../connection";

const EmailVerification = () => {
  const [error, setError] = useState({});
  const uid = location.pathname.split("/")[2];
  const token = location.pathname.split("/")[3];

  useEffect(() => {
    connection.post(`user/activate/${uid}/${token}/`).catch((err) => {
      setError(err.response.data);
      console.log(err.message);
    });
  }, []);

  return (
    <div>
      {error.detail && <span className="invalid-value">{error.detail}</span>}
      <h1 className="search">E-Mail successfully verified.</h1>
    </div>
  );
};

export default EmailVerification;
