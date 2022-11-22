import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import {
  Chart,
  PieSeries,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Palette } from "@devexpress/dx-react-chart";
import { Tooltip } from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { userInformation } from "./api/localServices";
import { AvailableCredit } from "./api/localServices";
import { QtyProcessedDocuments } from "./api/localServices";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ArticleIcon from "@mui/icons-material/Article";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PaidIcon from "@mui/icons-material/Paid";
import Stack from "@mui/material/Stack";
import TaskIcon from "@mui/icons-material/Task";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

import { GetDocumentsCompleted } from "./api/localServices";
import { GetDocumentsPending } from "./api/localServices";
import CircularProgress from "@mui/material/CircularProgress";

function Dashboard() {
  const [user, setUser] = useState([]);
  const [credit, setCredit] = useState([]);
  const [qtyProcessedDocs, setQtyProcessedDocs] = useState();

  useEffect(() => {
    (async () => {
      const currentUser = await userInformation();
      setUser(currentUser);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const availableCredit = await AvailableCredit();
      setCredit(availableCredit[0]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const qtyDocs = await QtyProcessedDocuments();

      setQtyProcessedDocs(qtyDocs);
    })();
  }, []);

  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    (async () => {
      const getdocuments = await GetDocumentsCompleted();
      const arrayDocuments = Array.from(getdocuments);
      setDocuments(arrayDocuments.length);
    })();
  }, []);

  const [pending, setPending] = useState("0");

  useEffect(() => {
    (async () => {
      const getpending = await GetDocumentsPending();
      const arrayPending = Array.from(getpending);
      setPending(arrayPending.length);
    })();
  }, []);

  if (!qtyProcessedDocs) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "90vh" }}
      >
        <h2>Welcome, {user.names}</h2>
        <CircularProgress color="secondary" />
      </Grid>
    );
  }

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "90vh", padding: "5vh" }}
      >
        <h2>Welcome, {user.names}</h2>

        <Grid container spacing={4}>
          <Grid item md={4} xs={6}>
            <Card md={{ minWidth: 275 }} variant="outlined">
              <CardContent>
                <Stack direction="row" spacing={2}>
                  <Typography variant="h5" gutterBottom component="div">
                    {credit.totalCredits - credit.totalCreditUserDocument}
                  </Typography>
                  <PaidIcon fontSize="large" />
                </Stack>
                Credits Available
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={6}>
            <Card md={{ minWidth: 275 }} variant="outlined">
              <CardContent>
                <Stack direction="row" spacing={2}>
                  <Typography variant="h5" gutterBottom component="div">
                    {documents}
                  </Typography>
                  <TaskIcon fontSize="large" />
                </Stack>
                Completed Documents
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={6}>
            <Card md={{ minWidth: 275 }} variant="outlined">
              <CardContent>
                <Stack direction="row" spacing={2}>
                  <Typography variant="h5" gutterBottom component="div">
                    {pending}
                  </Typography>
                  <HourglassEmptyIcon fontSize="large" />
                </Stack>
                Pending Documents
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={2} xs={1}></Grid>
          <Grid item md={8} xs={12}>
            <Card sx={{ minWidth: 275 }} variant="outlined">
              <Typography m={2}>Processed Files</Typography>

              <Paper>
                <Chart data={qtyProcessedDocs} height="250">
                  <Legend />
                  <PieSeries
                    valueField="totalRecords"
                    argumentField="documentTypeName"
                    innerRadius={0.6}
                  />
                  <Palette scheme={4} />

                  <Tooltip />
                  <Animation />
                </Chart>
              </Paper>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
