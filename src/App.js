import logo from "./logo.svg";
import "./App.css";
import "@fontsource/roboto-condensed";
import Login from "./login";
import Twofa from "./twofa";
import Dashboard from "./dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Roboto Condensed",
    },
    palette: {
      primary: {
        light: "#ffffff",
        main: "#fff",
        dark: "#cccccc",
        contrastText: "#000",
      },
      secondary: {
        light: "#ff5d54",
        main: "#db1e2a",
        dark: "#a10001",
        contrastText: "#fff",
      },
    },
  });
  if (!localStorage.token) {
    return <Login />;
  }
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="twofa" element={<Twofa />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="navbar" element={<NavBar />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
