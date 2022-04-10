import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function ViewMarks() {
  const location = useLocation();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { description, id } = location?.state;
  const [existingMarks, setExistingMarks] = useState([]);

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
  //       }
  //     });
  // }, []);
  return <div>ViewMarks</div>;
}
