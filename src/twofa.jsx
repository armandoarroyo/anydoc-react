import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField, Grid, Box } from "@mui/material";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import { verifyCodeSMS, getUserInfo } from "./api/auth";
import { userInformation } from "./api/localServices";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "./customTheme";
function Twofa() {
  let theme = customTheme();
  let navigate = useNavigate();
  const [code, setCode] = useState("");

  async function handleClick() {
    let correctCode = await verifyCodeSMS(code);
    if (correctCode.status === 200) {
      let userinfo = await getUserInfo();

      if ((userinfo.status = 200)) {
        userInformation();
        navigate("/dashboard");
      }
    }
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
            <h2>Two Factor Authentication</h2>
            <p>Please enter the six digit code sent to your phone.</p>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              color="info"
              id="outlined-basic"
              label="6 Digit Code"
              variant="outlined"
              type="number"
              onChange={(event) => setCode(event.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button color="secondary" variant="contained" onClick={handleClick}>
              <LoginSharpIcon sx={{ mr: 2 }}></LoginSharpIcon> Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Twofa;
