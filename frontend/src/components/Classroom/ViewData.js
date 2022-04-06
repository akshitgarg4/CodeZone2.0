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
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

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

const handleSend = () =>{
  console.log("send called");
  //on click of this send email with mentor page to all the mentors present on that excell sheet 
}
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
    <IconButton color={'primary'}>
      <SendIcon onClick={handleSend} />&nbsp; Share Link with Mentors
    </IconButton>
    </div>
  );
}
