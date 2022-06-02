import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import FormControl from "@mui/material/FormControl";
function ChangePassword() {
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [reNewPassword, setReNewPassword] = React.useState("");

  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleNewPasswordChange = (event) => setNewPassword(event.target.value);
  const handleReNewPasswordChange = (event) =>
    setReNewPassword(event.target.value);

  function handleClick() {
    console.log("hurray");
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
              style={{ maxWidth: "300px" }}
            >
              <Grid item xs={12}>
                <h3>Change your password: </h3>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    id="outlined-required"
                    label="Current Password"
                    color="info"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    required
                    type="password"
                    id="outlined-required"
                    label="New Password"
                    value={newPassword}
                    color="info"
                    onChange={handleNewPasswordChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    required
                    type="password"
                    id="outlined-required"
                    label="Repeat New Password"
                    value={reNewPassword}
                    color="info"
                    onChange={handleReNewPasswordChange}
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
            </Grid>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ChangePassword;
