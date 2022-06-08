import logo from "./logo.svg";
import "./App.css";
import "@fontsource/roboto-condensed";
import { Outlet, Link } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./navbar";
import { ThemeProvider } from "@mui/material/styles";
import Login from "./login";
import customTheme from "./customTheme";
import MainButton from "./mainButton";
function App() {
  let theme = customTheme();

  if (!sessionStorage.token) {
    return <Login />;
  }
  return (
    <ThemeProvider theme={theme}>
      <nav>
        <NavBar />
      </nav>
      <body>
        <Outlet />
      </body>
      <div className="main-btn">
        <MainButton />
      </div>
    </ThemeProvider>
  );
}

export default App;
