import logo from "./logo.svg";
import "./App.css";
import "@fontsource/roboto-condensed";
import { Outlet, Link } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./navbar";
import { ThemeProvider } from "@mui/material/styles";
import Login from "./login";
import customTheme from "./customTheme";

function App() {
  let theme = customTheme();

  if (!sessionStorage.token) {
    return <Login />;
  }
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
