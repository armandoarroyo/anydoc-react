import React, { Component } from "react";

import Button from "@mui/material/Button";
import { TextField, Grid, Box } from "@mui/material";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";

class Login extends Component {
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
            <TextField id="outlined-basic" label="Email" variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            {" "}
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained">
              {" "}
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
