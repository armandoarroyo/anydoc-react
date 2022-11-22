import React, { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Grid from "@mui/material/Grid";

function navBarData() {
  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          display: loading,
        }}
      >
        <Grid item>
          <DownloadIcon></DownloadIcon>
        </Grid>
        <Grid item>
          <FileUploadIcon></FileUploadIcon>
        </Grid>
        <Grid item>
          <SaveIcon></SaveIcon>
        </Grid>
      </Grid>
    </>
  );
}

export default navBarData;
