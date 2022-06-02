import { createTheme } from "@mui/material/styles";

function customTheme() {
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
  return theme;
}

export default customTheme;
