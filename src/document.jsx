import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { GetDocumentDetail } from "./api/localServices";
import Grid from "@mui/material/Grid";
import JSONPretty from "react-json-pretty";
import { GetDocumentsCompleted } from "./api/localServices";
import Box from "@mui/material/Box";
import { GetImageDetail } from "./api/localServices";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import ReactJson from "react-json-view";
import ErrorIcon from "@mui/icons-material/Error";
import SvelteJSONEditor from "./SvelteJSONEditor";
import SaveIcon from "@mui/icons-material/Save";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import Chip from "@mui/material/Chip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RestoreIcon from "@mui/icons-material/Restore";
import { Tooltip } from "@mui/material";
import "./document.css";

function Document() {
  const documentID = useParams();
  const state = useLocation();
  let navigate = useNavigate();
  const [showEditor, setShowEditor] = useState(true);
  const [readOnly, setReadOnly] = useState(true);
  const [extractedDocument, setExtractedDocument] = useState(undefined);
  const [documentDetails, setDocumentDetails] = useState([]);
  const [documentImage, setDocumentImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState("");
  const [prevDocument, setPrevDocument] = useState([]);
  const [nextDocument, setNextDocument] = useState([]);
  const [documents, setDocuments] = useState(state.state.documents);
  const [displayUI, setDisplayUI] = useState("none");
  const [loading, setLoading] = useState("flex");
  const [disableSaveButton, setDisableSaveButton] = useState(true);
  const [disableRestoreButton, setDisableRestoreButton] = useState(true);

  const [content, setContent] = useState({
    json: "",
    text: undefined,
  });

  const handleEditButton = (event) => {
    setReadOnly(false);
    let regex = /,"[a-zA-Z]+":"[0-9]*\.[0-9]+\s%"/gi;
    let contentWithoutConfidence = JSON.stringify(extractedDocument).replaceAll(
      regex,
      ""
    );
    setContent({
      json: JSON.parse(contentWithoutConfidence),
      text: undefined,
    });
    setDisableSaveButton(false);
  };

  const handleRestoreButton = (event) => {
    setContent({
      json: extractedDocument,
      text: undefined,
    });
    setDisableSaveButton(false);
  };

  const handleSaveButton = (event) => {
    setReadOnly(true);
    setDisableRestoreButton(false);
    setDisableSaveButton(true);
  };
  useEffect(() => {}, []);

  useEffect(() => {
    (async () => {
      const getDocument = JSON.stringify(
        await GetDocumentDetail(documentID.id)
      );

      const getImage = await GetImageDetail(documentID.id);
      setDisplayUI("flex");
      setLoading("none");
      setDocumentImage(getImage);
      setExtractedDocument(JSON.parse(getDocument));

      setContent({
        json: JSON.parse(getDocument),
        text: undefined,
      });
    })();
  }, [documentID]);

  useEffect(() => {
    const getdocuments = state.state.documents;

    const arrayDocuments = Array.from(getdocuments).filter(
      (item) => item.id == documentID.id
    );
    setCurrentIndex(
      getdocuments.findIndex(function(item) {
        return item.id == documentID.id;
      })
    );
    setDocumentDetails(arrayDocuments);
  }, [documentID]);

  useEffect(() => {
    setNextDocument((currentIndex + 1) % state.state.documents.length);
    setPrevDocument((currentIndex - 1) % state.state.documents.length);
  }, [currentIndex]);

  async function handleNext(event) {
    event.preventDefault();
    navigate("/document/" + documents[nextDocument].id, {
      state: { documents },
    });
    setDisplayUI("none");
    setLoading("flex");
  }

  async function handlePrev(event) {
    event.preventDefault();
    navigate("/document/" + documents[prevDocument].id, {
      state: { documents },
    });
    setDisplayUI("none");
    setLoading("flex");
  }

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "90vh" }}
        sx={{
          display: loading,
        }}
      >
        <CircularProgress color="secondary" />
      </Grid>
      <Grid
        container
        style={{ minHeight: "90vh" }}
        sx={{
          display: displayUI,
        }}
      >
        {documentDetails.map((document, index) => {
          return (
            <>
              <Grid
                direction="row"
                alignItems="center"
                justifyContent="center"
                container
                style={{ maxHeight: "80vh" }}
              >
                <Grid item xs={6} style={{ textAlign: "center" }}>
                  <Zoom>
                    <img
                      alt={document.fileName}
                      src={documentImage.url}
                      width="550"
                      height="auto"
                      className="document-photo"
                    />
                  </Zoom>
                </Grid>
                <Grid item xs={6}>
                  <Grid container justify="center">
                    <Grid item xs={3} style={{ textAlign: "center" }}>
                      <Tooltip title="Restore" arrow>
                        <IconButton
                          color="info"
                          onClick={handleRestoreButton}
                          disabled={disableRestoreButton}
                        >
                          <RestoreIcon></RestoreIcon>
                        </IconButton>
                      </Tooltip>
                    </Grid>

                    <Grid item xs={3} style={{ textAlign: "center" }}>
                      <Tooltip title="Edit" arrow>
                        <IconButton color="info" onClick={handleEditButton}>
                          <EditIcon></EditIcon>
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={3} style={{ textAlign: "center" }}>
                      <Tooltip title="Save" arrow>
                        <IconButton
                          color="info"
                          onClick={handleSaveButton}
                          disabled={disableSaveButton}
                        >
                          <SaveIcon></SaveIcon>
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={3} style={{ textAlign: "center" }}>
                      <Tooltip title="Copy" arrow>
                        <IconButton color="info">
                          <ContentCopyIcon></ContentCopyIcon>
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Box
                        sx={{
                          overflow: "auto",
                        }}
                      >
                        <div class="my-json-editor">
                          <SvelteJSONEditor
                            content={content}
                            readOnly={readOnly}
                            onChange={setContent}
                          />
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 1, mt: 0 }}
              >
                <Grid item xs={1} style={{ textAlign: "center" }}>
                  <Tooltip title="Previous Document">
                    <Button
                      variant="outlined"
                      color="info"
                      onClick={handleNext}
                    >
                      Prev
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid item xs={5} style={{ textAlign: "center" }}>
                  <Typography>
                    <b>Name: </b>
                    {document.fileName.replace(
                      document.fileName.substring(
                        document.fileName.indexOf(".") - 13,
                        document.fileName.indexOf(".")
                      )
                    )}
                  </Typography>
                </Grid>

                <Grid item xs={5} style={{ textAlign: "center" }}>
                  <Tooltip title="Document type">
                    <Chip
                      label={document.documentType}
                      variant="filled"
                      sx={{ ml: 2 }}
                    />
                  </Tooltip>
                  <Tooltip title="Last modified">
                    <Chip
                      label={document.dateUpdated.substring(0, 10)}
                      variant="outlined"
                      sx={{ ml: 2 }}
                    />
                  </Tooltip>
                </Grid>

                <Grid item xs={1} style={{ textAlign: "center" }}>
                  <Tooltip title="Next Document">
                    <Button
                      variant="outlined"
                      color="info"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
}

export default Document;
