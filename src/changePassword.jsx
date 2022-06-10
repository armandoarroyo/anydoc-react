import React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography, Snackbar } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { changePassword } from "./api/auth";

function ChangePassword() {
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState("none");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordHelperText, setPasswordHelperText] =
    useState("Password required");

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
  const [showPassword, setShowPassword] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}/;
  const [snackMessage, setSnackMessage] = useState("");

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (validPassword && validNewPassword && validReNewPassword) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [validPassword, validNewPassword, validReNewPassword]);

  useEffect(() => {
    if (password.length > 1 && password === sessionStorage.pass) {
      setValidPassword(true);
      setPasswordHelperText("");
    } else {
      if (password.length < 1) {
        setValidPassword(false);
        setPasswordHelperText("Password required");
      } else {
        setValidPassword(false);
        setPasswordHelperText("Invalid password");
      }
    }
  }, [password]);

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
    if (reNewPassword === newPassword && reNewPassword.length > 1) {
      setValidReNewPassword(true);
      setReNewPasswordHelperText("");
    } else {
      setValidReNewPassword(false);
      setReNewPasswordHelperText("Passwords must match");
    }
  }, [reNewPassword, newPassword]);

  async function handleClick() {
    setLoading("block");
    setDisableButton(true);
    setDisableInput(true);
    const correctPasswordUpdate = await changePassword(
      password,
      newPassword,
      reNewPassword
    );

    if (correctPasswordUpdate.status === 200) {
      console.log(correctPasswordUpdate.status);
      setSnackMessage("Password updated succesfully.");
      setOpenSnack(true);
      setLoading("none");
      setDisableButton(false);
      setDisableInput(false);
    } else {
      setSnackMessage("Could not update password. Review and try again.");
      setLoading("none");
      setDisableButton(false);
      setDisableInput(false);
      setOpenSnack(true);
    }
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "90vh" }}
    >
      <Grid item xs={6}>
        <Box
          component="form"
          sx={{ flexGrow: 1 }}
          noValidate
          autoComplete="off"
        >
          <Grid
            container
            spacing={4}
            direction="column"
            style={{ maxWidth: "500px" }}
          >
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
              <FormControl>
                <TextField
                  style={{ width: 300 }}
                  color="info"
                  required
                  id="old-password-field"
                  label="Old Password"
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

            <Grid item xs={12} textAlign="center">
              <Button
                variant="contained"
                onClick={handleClick}
                color="secondary"
                disabled={disableButton}
              >
                <SaveIcon sx={{ mr: 2 }}></SaveIcon> Save
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
      </Grid>
    </Grid>
  );
}

export default ChangePassword;
