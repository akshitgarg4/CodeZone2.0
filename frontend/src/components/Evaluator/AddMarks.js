import React, {useEffect, useState} from 'react'
import {Grid} from "@mui/material";
import Sheet from "./Sheet";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useLocation} from "react-router-dom";


export default function AddMarks(){
	const location = useLocation();
	const {id, recordId} = location?.state;
	const [groupNumber, setGroupNumber] = useState(id);
	const [groupID, setGroupID] = useState("");
	const [dataFetched, setDataFetched] = useState(false);
	const [studentsData, setStudentsData] = useState([]);
	
	useEffect(() => {
		if(groupNumber !== 0 && studentsData.length > 0 && groupID !== ""){
			// console.log(studentsData, "EEE")
			setDataFetched(true);
		} else{
			// console.log(studentsData, "QQ")
			setDataFetched(false);
		}
	}, [groupNumber, studentsData, groupID])
	useEffect(() => {
		// api to get the list of the group with existing marks by GroupNumber
		if(groupNumber != ''){
			setDataFetched(false);
			console.log(groupNumber);
		fetch(`/data/evaluator/record_number/${recordId}/group_number/${groupNumber}`, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Bearer ${localStorage.getItem("CodeZone2_Token")}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				
				if(data?.success){
					setGroupNumber(data.data[0].GroupNumber);
					setDataFetched(true);
					setGroupID(data.data[0].groupID);
					console.log(data?.data[0]?.students);
					setStudentsData(data.data[0].students);
					console.log(groupID,groupNumber,studentsData,recordId);
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
				<TextField fullWidth label="Group No" id="fullWidth" defaultValue={groupNumber} onChange = {(e)=>{setGroupNumber(e.target.value)}}/>
			</Box>
			{dataFetched &&
				<Sheet studentsData={studentsData} groupNumber={groupNumber} groupID={groupID} recordID={recordId}/>}
		</Grid>
	)
}

