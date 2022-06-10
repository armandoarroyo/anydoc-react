import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "./customTheme";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Grid,
  Box,
  Snackbar,
  FormControl,
  Button,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { forgotPassword } from "./api/auth";

function ForgotPassword() {
  const [disableButton, setDisableButton] = useState(true);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("Email required");
  const emailRegex = /\S+@\S+\.\S+/;
  const [loading, setLoading] = useState("none");
  const [disableInput, setDisableInput] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [disableLink, setDisableLink] = useState(false);

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

  const handleReturnClick = (event) => {
    event.preventDefault();
    navigate("/login");
  };
  async function handleClick() {
    setDisableInput(true);
    setDisableButton(true);
    setLoading("block");
    setDisableLink(true);
    const correctEmail = await forgotPassword(email);

    if (correctEmail.status === 200) {
      navigate("/forgotPasswordTwoFa");
    } else {
      setLoading("none");
      setDisableButton(false);
      setDisableInput(false);
      setOpenSnack(true);
      setDisableLink(false);
    }
  }

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  useEffect(() => {
    if (validEmail) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [validEmail]);

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
            <h2 style={{ textAlign: "center" }}>Forgot Password</h2>
            <p>
              Please enter your email address and a validation code will be sent
              to you.
            </p>
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
            <Button
              variant="contained"
              onClick={handleClick}
              color="secondary"
              disabled={disableButton}
            >
              Submit
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="info"
              onClick={handleReturnClick}
              disabled={disableLink}
            >
              Return to Login
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
              message="Could not sent verification code. Please validate your email and try again."
              autoHideDuration={3000}
            />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default ForgotPassword;
