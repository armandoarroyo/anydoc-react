import React, { Component } from "react";
import { userInformation } from "./api/localServices";
import NavBar from "./navbar";

class dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: userInformation(),
    };
  }

  render() {
    return <h1>DASHBOARD {localStorage.names}</h1>;
  }
}

export default dashboard;
