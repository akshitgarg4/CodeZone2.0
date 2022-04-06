import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function ExistingFiles(props) {
  const [existingData, setExistingData] = useState([]);
  useEffect(() => {
    fetch("/data/past_uploads", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("CodeZone2_Token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          setExistingData(data?.data);
        }
      });
  }, [props.data]);

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
        Past Uploaded Files!!
      </Typography>
      <TableContainer
        component={Paper}
        style={{ paddingLeft: "100px", paddingTop: "50px" }}
      >
        <Table sx={{ maxWidth: 950 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S. No.</TableCell>
              <TableCell align="right">File Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Date Uploaded</TableCell>
              <TableCell align="right">Time Uploaded</TableCell>
              <TableCell align="right">View Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {existingData.map((row,count) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {count+1}
                </TableCell>
                <TableCell align="right">{row.fileName}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.dateUploaded}</TableCell>
                <TableCell align="right">{row.timeUploaded}</TableCell>
                <TableCell align="right">View</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
