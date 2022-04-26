import {Grid} from "@mui/material";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Sheet from "./Sheet/Sheet";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useParams} from "react-router-dom";

const MentorPage = (props) => {
	const [groupNumber, setGroupNumber] = useState(0);
	const [groupID, setGroupID] = useState("");
	const [dataFetched, setDataFetched] = useState(false);
	const [studentsData, setStudentsData] = useState([]);
	const {recordId} = useParams();
	useEffect(() => {
		if(groupNumber !== 0 && studentsData.length > 0 && groupID !== ""){
			setDataFetched(true);
		} else{
			setDataFetched(false);
		}
	}, [groupNumber, studentsData, groupID])
	useEffect(() => {
		//Need to fetch data from backend here and poplulate the first two columns name and sid's
		console.log(recordId);
		fetch(`/data/mentor/marksFetch/${recordId}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('CodeZone2_Token')}`
			}
		})
			.then((response) => response.json())
			.then((data) => {
				if(data?.success){
					setGroupNumber(data.data[0].GroupNumber);
					setGroupID(data.data[0].groupID);
					
					setStudentsData(data.data[0].students);
					console.log(data.data, "RR");
					console.log(data.data[0], data.data[0].GroupNumber)
				}
			})
			.catch((err) => {
				console.log(err)
			});
	}, [recordId])
	
	return (
		<Grid container>
			<Box
				m={3}
				sx={{
					width: "100%",
					maxWidth: "100%",
				}}
			>
				<TextField fullWidth label="Group No" id="fullWidth"/>
			</Box>
			{dataFetched && <Sheet studentsData={studentsData} groupNumber={groupNumber} groupID={groupID}/>}
		</Grid>
	);
}

function mapStateToProps(state){
	return {
		auth: state.auth,
	};
}

export default connect(mapStateToProps)(MentorPage);
