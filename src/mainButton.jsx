import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function MainButton() {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/upload");
  }
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab color="secondary" variant="extended" onClick={handleClick}>
        <AddIcon sx={{ mr: 1 }} />
        File Upload
      </Fab>
    </Box>
  );
}
