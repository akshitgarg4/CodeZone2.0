import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import Table2 from "./Table2";

export default function ViewMarks() {
  const location = useLocation();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { description, id } = location?.state;
  const [existingMarks, setExistingMarks] = useState([]);
  const [evaluators, setEvaluators] = useState({});
  const [playCircle, setPlayCircle] = useState(true);

  useEffect(() => {
    fetch(`/data/existing_marks/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("CodeZone2_Token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          setExistingMarks(data?.data?.studentMarks);
          setEvaluators(data?.data?.evaluator);
          setPlayCircle(false);
          setSuccess("Marks Fetched");
          setTimeout(() => {
            setSuccess("");
          }, 8000);
        } else {
          setPlayCircle(false);
          setError("Error while fetching marks Plz try again");
          setTimeout(() => {
            setError("");
          }, 8000);
        }
      });
  }, []);
  return (
    <>
      {playCircle && (
        <>
          <CircularProgress
            disableShrink
            style={{ marginLeft: "40%", marginTop: "20%" }}
          />
          Fetching Marks....
        </>
      )}
      {error && (
        <Snackbar open={true} autoHideDuration={2000}>
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      )}
      {success && (
        <Snackbar open={true} autoHideDuration={2000}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {success}
          </Alert>
        </Snackbar>
      )}
      {!playCircle && (
        <Table2
          existingMarks={existingMarks}
          existingEvaluators={evaluators}
          description={description}
        />
      )}
    </>
  );
}
