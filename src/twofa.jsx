import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField, Grid, Box, Snackbar, FormControl } from "@mui/material";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import { verifyCodeSMS, getUserInfo } from "./api/auth";
import { userInformation } from "./api/localServices";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "./customTheme";
import CircularProgress from "@mui/material/CircularProgress";

function Twofa() {
  let theme = customTheme();
  let navigate = useNavigate();
  const [code, setCode] = useState("");
  const [validCode, setValidCode] = useState(false);
  const [codeHelperText, setCodeHelperText] = useState("Six digit required");
  const [loading, setLoading] = useState("none");
  const [disableButton, setDisableButton] = useState(true);
  const [disableInput, setDisableInput] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

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

  useEffect(() => {
    if (validCode) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [validCode]);
  async function handleClick() {
    setLoading("block");
    setDisableButton(true);
    setDisableInput(true);
    let correctCode = await verifyCodeSMS(code);
    if (correctCode.status === 200) {
      let userinfo = await getUserInfo();

      if ((userinfo.status = 200)) {
        userInformation();
        navigate("/dashboard");
      }
    } else {
      console.log(correctCode);
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
            <h2 style={{ textAlign: "center" }}>Two Factor Authentication</h2>
            <p style={{ textAlign: "center" }}>
              Please enter the six digit code sent to your phone.
            </p>
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
              color="secondary"
              variant="contained"
              onClick={handleClick}
              disabled={disableButton}
            >
              <LoginSharpIcon sx={{ mr: 2 }}></LoginSharpIcon> Submit
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

export default Twofa;
