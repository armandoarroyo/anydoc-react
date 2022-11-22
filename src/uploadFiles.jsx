import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import { FileUpload } from "./api/fileUpload";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ErrorIcon from "@mui/icons-material/Error";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";

function UploadFiles() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileUpload, setFileUpload] = useState();
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [fileType, setFileType] = useState(1);
  const [fileTypeName, setFileTypeName] = useState("Receipt");
  const [disableButton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState("none");
  const [disableUploadButton, setDisableUploadButton] = useState(true);

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  const handleChange = (event) => {
    setFileType(event.target.value);
  };

  async function handleClick() {
    setDisableButton(true);
    setDisableUploadButton(true);
    setLoading("block");
    const fileList = Array.from(selectedFiles[0]);
    const filterFileList = new Array();
    filterFileList[0] = fileList;
    // setSelectedFiles(filterFileList);
    for (const file of fileList) {
      const fu = await FileUpload(file, fileType, fileTypeName);
      //setFileUpload(fu);

      if (fu) {
        file.status = <CheckBoxIcon color="success" />;
      } else {
        file.status = <ErrorIcon color="error" />;
      }
    }

    setLoading("none");
    setSelectedFiles(filterFileList);
    setDisableUploadButton(false);
    setDisableButton(false);
  }

  function handleRemoveItem(name) {
    const fileList = Array.from(selectedFiles[0]);
    const filterFileList = new Array();
    filterFileList[0] = fileList.filter((item) => item.name !== name);
    setSelectedFiles(filterFileList);
  }
  useEffect(() => {
    const fileTypeId = fileType;
    if (fileTypeId === 1) {
      setFileTypeName("Receipt");
    }
    if (fileTypeId === 2) {
      setFileTypeName("Invoice");
    }
    if (fileTypeId === 3) {
      setFileTypeName("Purchase Order");
    }
  }, [fileType, fileTypeName]);

  useEffect(() => {
    if (selectedFiles.length > 0) {
      setDisableUploadButton(false);

      const fileList = Array.from(selectedFiles[0]);

      setFilesToUpload(
        fileList.map((file, index) => (
          <>
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={file.name} secondary={file.type} />
              <Chip
                label={formatBytes(file.size)}
                variant="outlined"
                sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
              />
              <Chip
                sx={{ ml: 2, mr: 2 }}
                label={fileTypeName}
                variant="outlined"
              />

              <IconButton
                name={index}
                color="secondary"
                aria-label="remove item"
                component="span"
                data-remove={index}
                disabled={disableButton}
                onClick={() => handleRemoveItem(file.name)}
              >
                <DeleteForeverIcon></DeleteForeverIcon>
              </IconButton>
              <Box
                sx={{
                  display: loading,
                }}
              >
                <CircularProgress color="secondary"></CircularProgress>
              </Box>

              {file.status}
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))
      );
    } else {
      setFilesToUpload("");
      setDisableUploadButton(true);
    }
  }, [selectedFiles, loading]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "90vh" }}
    >
      <Grid xs={12} container direction="row" spacing={2}>
        <Grid item xs={12} md={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 75 }}
          >
            <FormControl sx={{ m: 1, minWidth: 160, height: 60 }} color="info">
              <InputLabel id="filetype-simple-select-label" color="info">
                File Type
              </InputLabel>
              <Select
                labelId="filetype-simple-select-label"
                id="filetype-simple-select"
                label="File Type"
                value={fileType}
                onChange={(e) => {
                  setSelectedFiles([]);
                  setFileType(e.target.value);
                }}
                color="info"
                sx={{ width: 200 }}
              >
                <MenuItem value={1}>Receipt</MenuItem>
                <MenuItem value={2}>Invoice</MenuItem>
                <MenuItem value={3}>Purchase Order</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 75 }}
          >
            <FormControl sx={{ m: 1, minWidth: 160, height: 60 }}>
              <Button
                variant="outlined"
                color="info"
                component="label"
                sx={{ ml: 2, mr: 2, width: 200 }}
              >
                Select file(s)
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg, .pdf"
                  onChange={(e) => setSelectedFiles([e.target.files])}
                  disabled={disableButton}
                  multiple
                  hidden
                />
              </Button>
              <FormHelperText>
                Allowed extensions: png, jpg, jpeg, pdf
              </FormHelperText>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 75 }}
          >
            <Button
              sx={{ ml: 2, mr: 2, height: 50, width: 200 }}
              variant="outlined"
              component="span"
              color="secondary"
              disabled={disableUploadButton}
              onClick={handleClick}
            >
              Upload
            </Button>
          </Box>
        </Grid>
      </Grid>

      <List
        style={{ height: "80vh", overflow: "auto" }}
        sx={{
          width: "100%",
        }}
      >
        {filesToUpload}
      </List>
    </Grid>
  );
}

export default UploadFiles;
