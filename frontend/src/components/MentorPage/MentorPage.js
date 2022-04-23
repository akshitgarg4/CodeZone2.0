import {Grid} from "@mui/material";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Sheet from "./Sheet/Sheet";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useParams} from "react-router-dom";

const MentorPage = (props) => {
	console.log(props.auth.inProgress, props);
	const [midSemesterMarks, setMidSemesterMarks] = useState([]);
	const [endSemesterMarks, setEndSemesterMarks] = useState([]);
	const {recordId} = useParams();
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
				console.log(data);
				if(data?.success){
					//njvrk
					console.log(data.data, "RR");
					
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
			<Sheet midSemester={midSemesterMarks} endSemester={endSemesterMarks}/>
		</Grid>
	);
}

function mapStateToProps(state){
	return {
		auth: state.auth,
	};
}

export default connect(mapStateToProps)(MentorPage);
