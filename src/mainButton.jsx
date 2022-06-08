import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function MainButton() {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab color="secondary" variant="extended">
        <AddIcon sx={{ mr: 1 }} />
        File Upload
      </Fab>
    </Box>
  );
}
