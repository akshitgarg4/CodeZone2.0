import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ViewData(props) {
  const location = useLocation();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [evaluators, setEvaluators] = useState([]);
  const [finalEvaluators, setFinalEvaluators] = useState([]);
  const { data, description, id } = location?.state;
  useEffect(()=>{
    // api to get the list of all the evaluators mapped in the backend
    // fetch("/data/evaluators_list", {
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Authorization: `Bearer ${localStorage.getItem("CodeZone2_Token")}`,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data?.success) {
    //       setEvaluators(data?.list);
    //     }
    //   });
  },[])
  const handleSend = (id) => {
    console.log("send called", id);
    //on click of this send email with mentor page to all the mentors present on that excell sheet
    // fetch("/send_email", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("CodeZone2_Token")}`,
    //   },
    //   body: JSON.stringify({
    //     id: id,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data?.success) {
    //       setSuccess("Mails sent successfully");
    //       setTimeout(() => {
    //         setSuccess("");
    //       }, 8000);
    //     } else {
    //       setError("Error while sending Plz try again");
    //       setTimeout(() => {
    //         setError("");
    //       }, 8000);
    //     }
    //   })
    //   .catch((err) => {
    //     setError(err);
    //     setTimeout(() => {
    //       setError("");
    //     }, 8000);
    //   });
  };

  return (
    <div
      style={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "auto",
        m: 2,
      }}
    >
      <Typography component="h1" variant="h5">
        {description}
      </Typography>
      <TableContainer component={Paper} style={{ margin: 4 }}>
        <Table sx={{ maxWidth: 1200, margin: 4 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>S. No.</StyledTableCell>
              <StyledTableCell align="right">SID A</StyledTableCell>
              <StyledTableCell align="right">Student A</StyledTableCell>
              <StyledTableCell align="right">SID B</StyledTableCell>
              <StyledTableCell align="right">Student B</StyledTableCell>
              <StyledTableCell align="right">SID C</StyledTableCell>
              <StyledTableCell align="right">Student C</StyledTableCell>
              <StyledTableCell align="right">SID D</StyledTableCell>
              <StyledTableCell align="right">Student D</StyledTableCell>
              <StyledTableCell align="right">SID E</StyledTableCell>
              <StyledTableCell align="right">Student E</StyledTableCell>
              <StyledTableCell align="right">Mentor</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, count) => (
              <StyledTableRow key={count}>
                <StyledTableCell component="th" scope="row">
                  {count + 1}
                </StyledTableCell>
                <StyledTableCell align="right">{row["SID A"]}</StyledTableCell>
                <StyledTableCell align="right">
                  {row["Student A"]}
                </StyledTableCell>
                <StyledTableCell align="right">{row["SID B"]}</StyledTableCell>
                <StyledTableCell align="right">
                  {row["Student B"]}
                </StyledTableCell>
                <StyledTableCell align="right">{row["SID C"]}</StyledTableCell>
                <StyledTableCell align="right">
                  {row["Student C"]}
                </StyledTableCell>
                <StyledTableCell align="right">{row["SID D"]}</StyledTableCell>
                <StyledTableCell align="right">
                  {row["Student D"]}
                </StyledTableCell>
                <StyledTableCell align="right">{row["SID E"]}</StyledTableCell>
                <StyledTableCell align="right">
                  {row["Student E"]}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row["Faculty Mentor"]}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      <IconButton color={"primary"} onClick={() => handleSend(id)}>
        <SendIcon />
        &nbsp; Share Link with Mentors
      </IconButton>
    </div>
  );
}
