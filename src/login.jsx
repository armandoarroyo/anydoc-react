import React, { Component } from "react";
import Button from "@mui/material/Button";
import { TextField, Grid, Box } from "@mui/material";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import { login } from "./api/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.reset();
  }

  reset() {
    this.state = {
      email: "luis.arroyo@xerox.com",
      password: "",
    };
  }

  async handleClick(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const correctLogin = login(email, password);
  }

  state = {};
  render() {
    return (
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          rowSpacing={5}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          alignItems="center"
          justifyContent="center"
          direction="column"
          style={{ minHeight: "100vh" }}
        >
          <Grid item>
            <h2>AnyDoc</h2>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={this.state.email}
              onChange={(event) => this.setState({ email: event.target.value })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="outlined-basic"
              label="Password"
              variant="outlined"
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={(event) => this.handleClick(event)}
            >
              <LoginSharpIcon sx={{ mr: 2 }}></LoginSharpIcon> Login
            </Button>
          </Grid>

          <Grid item>
            <Button variant="outlined">Forgot Password?</Button>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default Login;
