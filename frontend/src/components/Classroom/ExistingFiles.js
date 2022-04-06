import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function ExistingFiles(props) {
  let navigate = useNavigate();
  const [existingData, setExistingData] = useState([]);
  const handleDelete = (doc_id) => {
    console.log("DOC DELETED",doc_id);
    //post doc_id to be deleted
    //response send all the documents of that user if success
    //send the docs in recent order doc that was uploaded recently needs to be on index 0

    // fetch("/data/delete_record", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("CodeZone2_Token")}`,
    //   },
    //   body: JSON.stringify({
    //     doc_id: doc_id,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data?.success) {
    //       setExistingData(data?.data);
    //     }
    //   });
  };
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
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {existingData.map((row, count) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {count + 1}
                </TableCell>
                <TableCell align="right">{row.fileName}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">
                  {row.dateUploaded.slice(0, 10)}
                </TableCell>
                <TableCell align="right">
                  {row.timeUploaded.slice(11, 19)}
                </TableCell>
                <TableCell align="right">
                  {row.number && (
                    <button
                      onClick={() =>
                        navigate(`/View-Data/${row.number}`, {
                          state: { data: row.data },
                        })
                      }
                    >
                      View Data
                    </button>
                  )}
                </TableCell>
                <TableCell align="right">
                  {row.number && (
                    <IconButton>
                    <DeleteIcon onClick={() => handleDelete(row.number)} />
                  </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
