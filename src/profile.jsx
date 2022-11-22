import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import CountryCodes from "./api/helpers/countryCodes";
import { MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { changeInformation } from "./api/localServices";
import KeyIcon from "@mui/icons-material/Key";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Snackbar } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
const options = CountryCodes();

function Profile() {
  let navigate = useNavigate();
  const [countryCode, setCountryCode] = useState(sessionStorage.countryCode);
  const [phone, setPhone] = useState(sessionStorage.phone);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(
    sessionStorage.welcomeMessage
  );
  const [validPhone, setValidPhone] = useState(true);
  const [firstName, setFirstName] = useState(sessionStorage.names);
  const [validFirstName, setValidFirstName] = useState(true);
  const [lastName, setLastName] = useState(sessionStorage.surNames);
  const [validLastName, setValidLastName] = useState(true);
  const [disableButton, setDisableButton] = useState(true);
  const [openSnack, setOpenSnack] = useState(false);
  const [loading, setLoading] = useState("none");
  const handleCountryChange = (event) => setCountryCode(event.target.value);
  const handlePhoneChange = (event) => setPhone(event.target.value);
  const [snackMessage, setSnackMessage] = useState("");
  const [disableInput, setDisableInput] = useState(false);
  const [firstNameHelperText, setFirstNameHelperText] = useState("");
  const [lastNameHelperText, setLastNameHelperText] = useState("");
  const [phoneHelperText, setPhoneHelperText] = useState("");

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  async function handleClick() {
    setDisableInput(true);
    setDisableButton(true);
    setLoading("block");

    const correctUpdate = await changeInformation(
      firstName,
      lastName,
      countryCode,
      phone
    );
    if (correctUpdate.status === 200) {
      setSnackMessage("Information updated succesfully.");
      setOpenSnack(true);
      setLoading("none");
      setDisableButton(false);
      setDisableInput(false);
    } else {
      setSnackMessage(
        correctUpdate.data.message ||
          "Could not update information. Please review and try again."
      );
      setLoading("none");
      setDisableButton(false);
      setDisableInput(false);
      setOpenSnack(true);
    }
  }

  useEffect(() => {
    if (validFirstName && validLastName && validPhone) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [validFirstName, validLastName, validPhone]);

  useEffect(() => {
    if (firstName.length < 1) {
      setFirstNameHelperText("Name required");
      setValidFirstName(false);
    } else {
      setValidFirstName(true);
      setFirstNameHelperText("");
    }
  }, [firstName]);

  useEffect(() => {
    if (lastName.length < 1) {
      setLastNameHelperText("Last name required");
      setValidLastName(false);
    } else {
      setValidLastName(true);
      setLastNameHelperText("");
    }
  }, [lastName]);

  useEffect(() => {
    if (phone.length < 1) {
      setPhoneHelperText("Last name required");
      setValidPhone(false);
    } else {
      setValidPhone(true);
      setPhoneHelperText("");
    }
  }, [phone]);

  function handleChangePass() {
    navigate("/change_password");
  }
  return (
    <Grid
      container
      spacing={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "90vh" }}
    >
      <Grid item md={6} xs={12}>
        <Box component="form" noValidate autoComplete="off">
          <div>
            <Grid
              container
              spacing={8}
              alignItems="center"
              justifyContent="center"
              style={{ maxWidth: "600px" }}
            >
              <Grid item xs={12} textAlign="center">
                <h3>Update your profile information: </h3>
              </Grid>
              <Grid item md={6} xs={12} textAlign="center">
                <FormControl>
                  <TextField
                    disabled={disableInput}
                    required
                    id="outlined-required"
                    label="First Name"
                    value={firstName}
                    error={!validFirstName}
                    helperText={firstNameHelperText}
                    color="info"
                    onKeyPress={(event) => {
                      if (!/^[a-zA-Z_ ]*$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} textAlign="center">
                <FormControl>
                  <TextField
                    disabled={disableInput}
                    required
                    id="outlined-required"
                    label="Last Name"
                    value={lastName}
                    error={!validLastName}
                    helperText={lastNameHelperText}
                    color="info"
                    onKeyPress={(event) => {
                      if (!/^[a-zA-Z_ ]*$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} textAlign="center">
                <FormControl fullWidth>
                  <InputLabel color="info" id="countryCodeL">
                    Country Code
                  </InputLabel>
                  <Select
                    disabled={disableInput}
                    fullWidth
                    label="Country Code"
                    id="countryCode"
                    labelId="countryCodeL"
                    margin="dense"
                    displayEmpty
                    name="countryCode"
                    onChange={handleCountryChange}
                    value={countryCode}
                    variant="outlined"
                    color="info"
                    sx={{ width: 200 }}
                  >
                    {options.map((element, index) => (
                      <MenuItem value={element.dial_code} key={index}>
                        {element.dial_code} - {element.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} textAlign="center">
                <FormControl>
                  <TextField
                    required
                    disabled={disableInput}
                    id="outlined-required"
                    label="Phone"
                    value={phone}
                    error={!validPhone}
                    color="info"
                    helperText={phoneHelperText}
                    onChange={handlePhoneChange}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} textAlign="center">
                <FormControl>
                  <TextField
                    disabled
                    required
                    id="outlined-required"
                    label="Company"
                    value={sessionStorage.company}
                    color="info"
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12} textAlign="center">
                <FormControl>
                  <TextField
                    disabled
                    required
                    id="outlined-required"
                    label="Role"
                    value={sessionStorage.roleCompanyName}
                  />
                </FormControl>
              </Grid>

              <Grid item md={6} xs={12} textAlign="center">
                <FormControl>
                  <TextField
                    required
                    disabled
                    id="outlined-required"
                    label="Email"
                    value={sessionStorage.email}
                    color="info"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} textAlign="center">
                <FormControl>
                  <FormControlLabel
                    label="Show welcome message"
                    control={
                      <Checkbox
                        color="info"
                        value={showWelcomeMessage}
                        disabled={disableInput}
                      />
                    }
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
              <Grid item xs={12} textAlign="center">
                <Button
                  variant="outlined"
                  onClick={handleChangePass}
                  color="info"
                >
                  <KeyIcon sx={{ mr: 2 }}></KeyIcon> Change Password
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
          </div>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Profile;
