import React from "react";
import { GetDocumentsPending } from "./api/localServices";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ArticleIcon from "@mui/icons-material/Article";
import ListItemText from "@mui/material/ListItemText";
import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import { InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";

function Pending() {
  useEffect(() => {
    document.title = "Pending Documents";
  }, []);
  const [documents, setDocuments] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const getdocuments = await GetDocumentsPending();
      const arrayDocuments = Array.from(getdocuments);
      setDocuments(
        arrayDocuments.sort(function (a, b) {
          return a.value - b.value;
        })
      );
    })();
  }, []);

  if (!documents) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "90vh" }}
      >
        <CircularProgress color="secondary" />
      </Grid>
    );
  }

  if (documents.size < 1) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "90vh" }}
      >
        <h4>No documents.</h4>
      </Grid>
    );
  }

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "90vh" }}
    >
      <Grid xs={12} container direction="row" spacing={2}>
        <Grid item xs={12} md={3}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 60 }}
          >
            <h2>
              Pending Documents
              <Chip label={documents.length} variant="filled" sx={{ ml: 2 }} />
            </h2>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ ml: 2, height: 60 }}
          >
            Show me
            <Select
              labelId="filetype-simple-select-label"
              id="filetype-simple-select"
              value={typeFilter}
              //label="File Type"
              onChange={(e) => setTypeFilter(e.target.value)}
              color="info"
              sx={{ ml: 2, mr: 2 }}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Receipt"}>Receipts</MenuItem>
              <MenuItem value={"Invoice"}>Invoices</MenuItem>
              <MenuItem value={"Purchase Order"}>Purchase Orders</MenuItem>
            </Select>
            files, sorted by
            <Select
              labelId="filetype-simple-select-label"
              id="filetype-simple-select"
              value={dateFilter}
              //label="File Type"
              onChange={(e) => setDateFilter(e.target.value)}
              color="info"
              sx={{ ml: 2, mr: 2 }}
            >
              <MenuItem value={true}>Newest </MenuItem>
              <MenuItem value={false}>Oldest</MenuItem>
            </Select>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 60 }}
          >
            <FormControl>
              <TextField
                id="outlined-required"
                value={nameFilter}
                type="text"
                color="info"
                placeholder="Search"
                onChange={(event) => setNameFilter(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="clear search"
                        onClick={(event) => setNameFilter("")}
                        edge="end"
                      >
                        {nameFilter.length > 0 ? <ClearIcon /> : <SearchIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <List
        style={{ height: "80vh", overflow: "auto" }}
        sx={{
          width: "100%",
        }}
      >
        {documents
          .filter(
            (f) =>
              (f.fileName.includes(nameFilter) || nameFilter === "") &&
              (f.documentType.includes(typeFilter) || typeFilter === "All")
          )
          .sort((a, b) =>
            dateFilter
              ? a.dateUpdated < b.dateUpdated
              : a.dateUpdated > b.dateUpdated
          )
          .map((document, index) => {
            return (
              <>
                <ListItem key={index} id={document.fileName}>
                  <ListItemAvatar>
                    <Avatar>
                      <ArticleIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={document.fileName.replace(
                      document.fileName.substring(
                        document.fileName.indexOf(".") - 13,
                        document.fileName.indexOf(".")
                      ),
                      ""
                    )}
                    secondary={document.dateUpdated.substring(0, 24)}
                  />
                  <Chip
                    label={document.documentType}
                    size="small"
                    variant="outlined"
                  />
                </ListItem>
                <Divider />
              </>
            );
          })}
      </List>
    </Grid>
  );
}

export default Pending;
