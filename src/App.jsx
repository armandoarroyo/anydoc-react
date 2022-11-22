import "./App.css";
import "@fontsource/roboto-condensed";
import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import NavBar from "./navbar";
import { ThemeProvider } from "@mui/material/styles";
import Login from "./login";
import customTheme from "./customTheme";
import MainButton from "./mainButton";
import jwt_decode from "jwt-decode";
import { logout } from "./api/auth";

function App() {
  let theme = customTheme();
  useEffect(() => {
    document.title = "AnyDoc";
  });
  if (!sessionStorage.token) {
    return <Login />;
  }
  if (sessionStorage.token) {
    const decodedJwt = jwt_decode(sessionStorage.access_token);
    if (decodedJwt.exp * 1000 < Date.now()) {
      logout();
      return <Login />;
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <nav>
        <NavBar />
      </nav>
      <div>
        <Outlet />
      </div>
      <div className="main-btn">
        <MainButton />
      </div>
    </ThemeProvider>
  );
}

export default App;
