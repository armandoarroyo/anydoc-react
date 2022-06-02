import * as React from "react";

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
const options = CountryCodes();

function Profile() {
  let navigate = useNavigate();
  const [countryCode, setCountryCode] = React.useState("");
  const [phone, setPhone] = React.useState(sessionStorage.phone);

  const handleCountryChange = (event) => setCountryCode(event.target.value);
  const handlePhoneChange = (event) => setPhone(event.target.value);

  function handleClick() {
    console.log(countryCode);
    console.log(phone);
    const response = changeInformation(countryCode, phone);
    if (response.status === 200) {
      console.log("hurray");
    }
  }
  function handleChangePass() {
    navigate("/change_password");
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
          <div>
            <Grid
              container
              spacing={4}
              alignItems="center"
              justifyContent="center"
              style={{ maxWidth: "600px" }}
            >
              <Grid item xs={12}>
                <h3>Update your profile information: </h3>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    defaultValue={sessionStorage.names}
                    color="info"
                  />{" "}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    defaultValue={sessionStorage.surNames}
                    color="info"
                  />{" "}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel color="info" id="countryCodeL">
                    Country Code
                  </InputLabel>
                  <Select
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
                    {options.map((element) => (
                      <MenuItem
                        value={element.dial_code}
                        key={element.dial_code + element.code}
                      >
                        {element.dial_code} - {element.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <TextField
                    required
                    id="outlined-required"
                    label="Phone"
                    value={phone}
                    color="info"
                    onChange={handlePhoneChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <TextField
                    disabled
                    required
                    id="outlined-required"
                    label="Company"
                    defaultValue={sessionStorage.company}
                    color="info"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <TextField
                    disabled
                    required
                    id="outlined-required"
                    label="Role"
                    defaultValue={sessionStorage.roleCompanyName}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl>
                  <TextField
                    required
                    disabled
                    id="outlined-required"
                    label="Email"
                    defaultValue={sessionStorage.email}
                    color="info"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Button
                  variant="contained"
                  onClick={handleClick}
                  color="secondary"
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
            </Grid>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Profile;
