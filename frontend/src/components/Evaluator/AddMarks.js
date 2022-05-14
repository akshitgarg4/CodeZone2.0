import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Sheet from "./Sheet";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import { useLocation } from "react-router-dom";
import Select from '@mui/material/Select';

export default function AddMarks() {
  const location = useLocation();
  const { id, recordId } = location?.state;
  const [groupNumber, setGroupNumber] = useState(id);
  const [groupID, setGroupID] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const [studentsData, setStudentsData] = useState([]);
  const [show, setShow] = React.useState("Midsem");
  const handleChange = (event) => {
    setShow(event.target.value);
  };
  useEffect(() => {
    if (groupNumber !== 0 && studentsData.length > 0 && groupID !== "") {
      // console.log(studentsData, "EEE")
      setDataFetched(true);
    } else {
      // console.log(studentsData, "QQ")
      setDataFetched(false);
    }
  }, [groupNumber, studentsData, groupID]);
  useEffect(() => {
    // api to get the list of the group with existing marks by GroupNumber
    if (groupNumber !== "") {
      setDataFetched(false);
      fetch(
        `/data/evaluator/record_number/${recordId}/group_number/${groupNumber}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${localStorage.getItem("CodeZone2_Token")}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data?.success) {
            setGroupNumber(data.data[0].GroupNumber);
            setDataFetched(true);
            setGroupID(data.data[0].groupID);
            console.log(data?.data[0]?.students);
            setStudentsData(data.data[0].students);
            console.log(groupID, groupNumber, studentsData, recordId);
          }
        });
    }
  }, [id, groupNumber, recordId]);
  return (
    <Grid container>
      {!dataFetched && <h1>Fetching Data.....</h1>}
      <Box
        m={3}
        sx={{
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <TextField
          label="Group No"
          id="fullWidth"
		  style={{ width: 500,margin:10 }}
          defaultValue={groupNumber}
          onChange={(e) => {
            setGroupNumber(e.target.value);
          }}
        />
        <Select
		  label="Marks Field"
          id="fullWidth"
          value={show}
          onChange={handleChange}
		  style={{ width: 500, margin:10}}
        >
          <MenuItem value={"Midsem"}>Midsem</MenuItem>
          <MenuItem value={"Endsem"}>Endsem</MenuItem>
          <MenuItem value={"Both"}>All</MenuItem>

        </Select>
      </Box>
      {dataFetched && (
        <Sheet
          studentsData={studentsData}
          groupNumber={groupNumber}
          groupID={groupID}
		  show={show}
          recordID={recordId}
        />
      )}
    </Grid>
  );
}
