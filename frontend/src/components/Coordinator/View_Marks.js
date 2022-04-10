import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Fab from "@mui/material/Fab";
import CircularProgress from "@mui/material/CircularProgress";

export default function ViewMarks() {
  const location = useLocation();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { description, id } = location?.state;
  const [existingMarks, setExistingMarks] = useState([]);
  const [playCircle, setPlayCircle] = useState(true);

  // useEffect(() => {
  //   //send marks of all the students both midsem and endsem for the document with id = id
  //   format [{name:' ',sid: ' ', group_no:' ', mentor:' ', midsem_marks:['evaluator_1_name':{'presentation': ' ', viva: ' ',interaction: ' ',implementation:' '},'evaluator_2_name':{'presentation': ' ', viva: ' ',interaction: ' ',implementation:' '}], endsem_marks:['evaluator_1_name':{'presentation': ' ', viva: ' ',interaction: ' ',implementation:' ',report:''},'evaluator_2_name':{'presentation': ' ', viva: ' ',interaction: ' ',implementation:' ',report:' '}], grade_assigned: ' ',group_remarks:' '}]
  //   fetch("/data/existing_marks", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("CodeZone2_Token")}`,
  //     },,
  //   body: JSON.stringify({
  //     id: id,
  //   }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log(data);
  //       if (data?.success) {
  //         setExistingMarks(data?.data);
  //         setPlayCircle(false);
  //setSuccess("Marks Fetched");
  //       setTimeout(() => {
  //         setSuccess("");
  //       }, 8000);
  //       }else{
  //         setPlayCircle(false);
  // setError("Error while fetching marks Plz try again");
  //       setTimeout(() => {
  //         setError("");
  //       }, 8000);
  //
  //}
  //
  //     });
  // }, []);
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
    </>
  );
}
