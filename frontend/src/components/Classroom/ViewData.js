import React from 'react'
import { useLocation } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ViewData(props) {
    const location = useLocation();
    const {data,description} = location?.state;
    
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
      <TableContainer component={Paper} style={{margin:4}}>
      <Table sx={{ maxWidth: 1200, margin:4}} aria-label="customized table">
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
          {data.map((row,count) => (
            <StyledTableRow key={count}>
              <StyledTableCell component="th" scope="row">
                  {count + 1}
                </StyledTableCell>
                <StyledTableCell align="right">{row['SID A']}</StyledTableCell>
                <StyledTableCell align="right">{row['Student A']}</StyledTableCell>
                <StyledTableCell align="right">{row['SID B']}</StyledTableCell>
                <StyledTableCell align="right">{row['Student B']}</StyledTableCell>
                <StyledTableCell align="right">{row['SID C']}</StyledTableCell>
                <StyledTableCell align="right">{row['Student C']}</StyledTableCell>
                <StyledTableCell align="right">{row['SID D']}</StyledTableCell>
                <StyledTableCell align="right">{row['Student D']}</StyledTableCell>
                <StyledTableCell align="right">{row['SID E']}</StyledTableCell>
                <StyledTableCell align="right">{row['Student E']}</StyledTableCell>
                <StyledTableCell align="right">{row['Faculty Mentor']}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      {/* <TableContainer
        component={Paper}
        style={{ paddingLeft: "100px", paddingTop: "50px" }}
      >
        <Table sx={{ maxWidth: 950 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S. No.</TableCell>
              <TableCell align="right">SID A</TableCell>
              <TableCell align="right">Student A</TableCell>
              <TableCell align="right">SID B</TableCell>
              <TableCell align="right">Student B</TableCell>
              <TableCell align="right">SID C</TableCell>
              <TableCell align="right">Student C</TableCell>
              <TableCell align="right">SID D</TableCell>
              <TableCell align="right">Student D</TableCell>
              <TableCell align="right">SID E</TableCell>
              <TableCell align="right">Student E</TableCell>
              <TableCell align="right">Mentor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, count) => (
              <TableRow
                key={count}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {count + 1}
                </TableCell>
                <TableCell align="right">{row['SID A']}</TableCell>
                <TableCell align="right">{row['Student A']}</TableCell>
                <TableCell align="right">{row['SID B']}</TableCell>
                <TableCell align="right">{row['Student B']}</TableCell>
                <TableCell align="right">{row['SID C']}</TableCell>
                <TableCell align="right">{row['Student C']}</TableCell>
                <TableCell align="right">{row['SID D']}</TableCell>
                <TableCell align="right">{row['Student D']}</TableCell>
                <TableCell align="right">{row['SID E']}</TableCell>
                <TableCell align="right">{row['Student E']}</TableCell>
                <TableCell align="right">{row['Faculty Mentor']}</TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  );
}
