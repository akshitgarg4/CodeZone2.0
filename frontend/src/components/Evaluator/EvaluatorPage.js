import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import DATA from "./MOCK_DATA.json";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function EvaluatorPage() {
  let navigate = useNavigate();
  const { recordId } = useParams();
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [playCircle, setPlayCircle] = useState(false);
  const location = useLocation();
  console.log("location", location?.pathname);

  //to be deleted once data works
  if (!description) {
    setDescription(DATA?.description);
    setData(DATA?.data);
  }

  useEffect(() => {
    //Need to fetch complete data of the class which evaluator has to fill
    console.log(recordId);
    fetch(`/data/evaluator/marksFetch/${recordId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("CodeZone2_Token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          setDescription(data?.description);
          setData(data?.data);
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [recordId]);
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
        <>
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
              <Table
                sx={{ maxWidth: 1200, margin: 4 }}
                aria-label="customized table"
              >
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
                    <StyledTableCell align="right">Enter Marks</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, count) => (
                    <StyledTableRow key={count}>
                      <StyledTableCell component="th" scope="row">
                        {row["GroupNumber"]}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row["students"][0]}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row["SID"][0]}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row["students"][1]}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row["SID"][1]}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row["students"][2]}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row["SID"][2]}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row["students"][3]}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row["SID"][3]}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row["students"][4]}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row["SID"][4]}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row["mentor_name"]}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.GroupNumber && (
                          <button
                            onClick={() =>
                              navigate(`/add-marks/${row.GroupNumber}`, {
                                state: {
                                  id: row.GroupNumber,
                                  recordId,
                                  url: location?.pathname,
                                  count: data?.length,
                                },
                              })
                            }
                          >
                            Enter Marks
                          </button>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </>
  );
}
