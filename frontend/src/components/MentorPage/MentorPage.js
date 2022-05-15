import {Grid} from "@mui/material";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Sheet from "./Sheet/Sheet";
import Box from "@mui/material/Box";
import { useParams} from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


const MentorPage = (props) => {
	const [fullData,setFullData] = useState([]);
	const [groupNumber, setGroupNumber] = useState(0);
	const [groupID, setGroupID] = useState("");
	const [dataFetched, setDataFetched] = useState(false);
	const [studentsData, setStudentsData] = useState([]);
	const [show, setShow] = React.useState("Midsem");
	const {recordId} = useParams();
	useEffect(() => {
		if(groupNumber !== 0 && studentsData.length > 0 && groupID !== ""){
			console.log(studentsData, "EEE")
			setDataFetched(true);
		} else{
			console.log(studentsData, "QQ")
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
					console.log("Fetched Data",data);
					setGroupNumber(data?.data?.[0]?.GroupNumber);
					setGroupID(data?.data?.[0]?.groupID);
					setFullData(data?.data);
					setStudentsData(data?.data?.[0]?.students);
				}
			})
			.catch((err) => {
				console.log(err)
			});
	}, [recordId])
	const handleChange = (number) =>{
		fullData.map((item,idex)=>{
			if(item?.GroupNumber === number){
				console.log(item);
				setGroupNumber(item?.GroupNumber);
				setGroupID(item?.groupID);
				setStudentsData(item?.students);
				setDataFetched(true);
			}
            console.log(groupID, groupNumber, studentsData, recordId);
		})
	}
	const handleChange3 = (event) => {
		setShow(event.target.value);
	  };
	const handleChange2 = (event) => {
		setGroupID("");
		setGroupNumber(0);
		setStudentsData([]);
		setDataFetched(false);
		let number = event?.target?.value;
		setTimeout(() => {
			handleChange(number);
		  }, 500);
		
	  };
	return (
		<Grid container>
			{!dataFetched && (
        <h1 style={{ marginLeft: "30%" }}>Fetching Data.....</h1>
      )}
			{dataFetched && <Box
				m={3}
				sx={{
					width: "100%",
					maxWidth: "100%",
				}}
			>
				<Select
          label="Group No"
          id="fullWidth"
          value={groupNumber}
          onChange={handleChange2}
          style={{ width: 500, margin: 10 }}
        >
          {fullData.map((item, idx) => (
            <MenuItem value={item?.GroupNumber} key={idx}>
              {item?.GroupNumber}
            </MenuItem>
          ))}
        </Select>
		
			</Box>}
			{dataFetched && <Sheet studentsData={studentsData} show={show} groupNumber={groupNumber} groupID={groupID}/>}
		</Grid>
	);
}

function mapStateToProps(state){
	return {
		auth: state.auth,
	};
}

export default connect(mapStateToProps)(MentorPage);
