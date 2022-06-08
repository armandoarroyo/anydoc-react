import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField, Grid, Box, Snackbar, FormControl } from "@mui/material";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import { login } from "./api/auth";
import { useNavigate } from "react-router-dom";
import customTheme from "./customTheme";
import { ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState("none");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordHelperText, setPasswordHelperText] =
    useState("Password required");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("Email required");
  const emailRegex = /\S+@\S+\.\S+/;
  const [openSnack, setOpenSnack] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [disableInput, setDisableInput] = useState(false);

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let navigate = useNavigate();
  let theme = customTheme();

  useEffect(() => {
    if (emailRegex.test(email) && email.length > 1) {
      setValidEmail(true);
      setEmailHelperText("");
    } else {
      if (email.length < 1) {
        setValidEmail(false);
        setEmailHelperText("Email required");
      } else {
        setValidEmail(false);
        setEmailHelperText("Invalid email");
      }
    }
  }, [email]);

  useEffect(() => {
    console.log(password);
    if (password.length > 5) {
      setValidPassword(true);
      setPasswordHelperText("");
    }
    if (password.length > 1 && password.length < 6) {
      setValidPassword(false);
      setPasswordHelperText("Password too short");
    }
    if (password.length < 1) {
      setValidPassword(false);
      setPasswordHelperText("Password required");
    }
  }, [password]);

  useEffect(() => {
    if (validEmail && validPassword) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [validPassword, validEmail]);

  async function handleClick() {
    setDisableInput(true);
    setDisableButton(true);
    setLoading("block");
    const correctLogin = await login(email, password);
    if (correctLogin.status === 200) {
      navigate("/twofa");
    }
    setLoading("none");
    setDisableButton(false);
    setDisableInput(false);
    setOpenSnack(true);
  }
  return (
    <ThemeProvider theme={theme}>
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
            <FormControl>
              <TextField
                style={{ width: 300 }}
                required
                color="info"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                error={!validEmail}
                helperText={emailHelperText}
                disabled={disableInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl>
              <TextField
                style={{ width: 300 }}
                color="info"
                required
                id="password-field"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                error={!validPassword}
                helperText={passwordHelperText}
                disabled={disableInput}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleClick}
              color="secondary"
              disabled={disableButton}
            >
              <LoginSharpIcon sx={{ mr: 2 }}></LoginSharpIcon> Login
            </Button>
          </Grid>

          <Grid item>
            <Button variant="outlined" color="info">
              Forgot Password?
            </Button>
          </Grid>
          <Grid
            justify="center"
            item
            sx={{
              display: loading,
            }}
          >
            <CircularProgress color="secondary" />
          </Grid>
          <Grid>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={openSnack}
              onClose={handleCloseSnack}
              message="Could not log in. Try again."
              autoHideDuration={3000}
            />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Login;
