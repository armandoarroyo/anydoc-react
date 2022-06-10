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
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { resetPasswordWithCode } from "./api/auth";

function ForgotPasswordTwoFa() {
  const [disableButton, setDisableButton] = useState(true);
  const [disableLink, setDisableLink] = useState(false);
  const [validNewPassword, setValidNewPassword] = useState(false);
  const [newPasswordHelperText, setNewPasswordHelperText] =
    useState("Password required");
  const [newPassword, setNewPassword] = React.useState("");
  const [reNewPassword, setReNewPassword] = React.useState("");
  const [validReNewPassword, setValidReNewPassword] = useState(false);
  const [reNewPasswordHelperText, setReNewPasswordHelperText] = useState(
    "Passwords must match"
  );

  const [openSnack, setOpenSnack] = useState(false);
  const [loading, setLoading] = useState("none");

  const [showPassword, setShowPassword] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}/;

  const [code, setCode] = useState("");
  const [validCode, setValidCode] = useState(false);
  const [codeHelperText, setCodeHelperText] = useState("Six digit required");
  const [snackMessage, setSnackMessage] = useState("");

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleReturnClick = (event) => {
    event.preventDefault();
    navigate("/login");
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  let navigate = useNavigate();
  let theme = customTheme();

  async function handleClick() {
    setDisableInput(true);
    setDisableButton(true);
    setLoading("block");
    setDisableLink(true);
    const correctCode = await resetPasswordWithCode(newPassword, code);
    if (correctCode.status === 200) {
      setSnackMessage("Password updated succesfully.");
      setOpenSnack(true);
      setLoading("none");
      setDisableButton(true);
      setDisableLink(false);
    } else {
      setSnackMessage(
        correctCode.data.message || "Could not update password. Try again."
      );
      setLoading("none");
      setDisableButton(false);
      setDisableInput(false);
      setOpenSnack(true);
      setDisableLink(false);
    }
  }

  useEffect(() => {
    if (passwordRegex.test(newPassword) && newPassword.length > 1) {
      setValidNewPassword(true);
      setNewPasswordHelperText("");
    } else {
      if (newPassword.length < 1) {
        setValidNewPassword(false);
        setNewPasswordHelperText("New password required");
      } else {
        setValidNewPassword(false);
        setNewPasswordHelperText("Invalid password");
      }
    }
  }, [newPassword]);

  useEffect(() => {
    if (reNewPassword == newPassword && reNewPassword.length > 1) {
      setValidReNewPassword(true);
      setReNewPasswordHelperText("");
    } else {
      setValidReNewPassword(false);
      setReNewPasswordHelperText("Passwords must match");
    }
  }, [reNewPassword, newPassword]);

  useEffect(() => {
    if (validNewPassword && validReNewPassword && validCode) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [validCode, validNewPassword, validReNewPassword]);

  useEffect(() => {
    if (code.length < 6) {
      setValidCode(false);
      setCodeHelperText("Six digit code required");
    }
    if (code.length === 6) {
      setValidCode(true);
      setCodeHelperText("");
    }
  }, [code]);

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
              Please enter your new password and the validation code sent to
              your email.
            </p>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{ textAlign: "center" }}>Change your password </h3>

            <Typography variant="caption" display="block">
              At least one digit [0-9]
            </Typography>
            <Typography variant="caption" display="block">
              At least one lowercase character [a-z]
            </Typography>
            <Typography variant="caption" display="block">
              At least one uppercase character [A-Z]
            </Typography>
            <Typography variant="caption" display="block">
              At least 8 characters
            </Typography>
          </Grid>

          <Grid item xs={12} alignItems="center" justifyContent="center">
            <FormControl fullWidth>
              <TextField
                style={{ width: 300 }}
                color="info"
                required
                id="new-password-field"
                label="New Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setNewPassword(e.target.value)}
                error={!validNewPassword}
                helperText={newPasswordHelperText}
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
                  maxLength: 16,
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} alignItems="center" justifyContent="center">
            <FormControl fullWidth>
              <TextField
                style={{ width: 300 }}
                color="info"
                required
                id="repeat-new-password-field"
                label="Repeat New Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setReNewPassword(e.target.value)}
                error={!validReNewPassword}
                helperText={reNewPasswordHelperText}
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
            <FormControl>
              <TextField
                required
                color="info"
                id="outlined-basic"
                label="6 Digit Code"
                variant="outlined"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={(event) => setCode(event.target.value)}
                error={!validCode}
                helperText={codeHelperText}
                inputProps={{ maxLength: 6, style: { textAlign: "center" } }}
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
              message={snackMessage}
              autoHideDuration={3000}
            />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default ForgotPasswordTwoFa;
