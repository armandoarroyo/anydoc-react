import React from "react";
import { withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthVerify = (props) => {
  props.history.listen(() => {
    const user = sessionStorage.user;
    if (user) {
      const decodedJwt = jwt_decode(sessionStorage.access_token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  });
  return <div></div>;
};

export default withRouter(AuthVerify);
