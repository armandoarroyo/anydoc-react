import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { TextField, Grid, Box } from "@mui/material";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import { login } from "./api/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  function handleClick() {
    const correctLogin = login(email, password);
    if ((correctLogin.status = 200)) {
      navigate("/twofa");
    }
  }
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
          <h2>Login</h2>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            color="info"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            color="info"
            required
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleClick} color="secondary">
            <LoginSharpIcon sx={{ mr: 2 }}></LoginSharpIcon> Login
          </Button>
        </Grid>

        <Grid item>
          <Button variant="outlined" color="info">
            Forgot Password?
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
