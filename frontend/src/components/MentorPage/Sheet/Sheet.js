import React from "react";
import ReactDataSheet from "react-datasheet";
import {connect} from "react-redux";
import "react-datasheet/lib/react-datasheet.css";

//Mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Box} from "@mui/system";

const InputGridHeaders = ["Name", "Sid", "Presentation", "Viva", "Implementation", "Interaction", "Remarks"];

class Sheet extends React.Component{
  constructor(props){
      super(props);
      console.log(this.props, "RRRR");
      let midSemesterMarks = [];
      let endSemesterMarks = [];
    
      for(let studentsIndex = 0; studentsIndex < this.props.studentsData.length; studentsIndex++){
          let currentMid = [];
          let currentEnd = [];
          currentMid.push({value: this.props.studentsData[studentsIndex].name});
          currentMid.push({value: this.props.studentsData[studentsIndex].sid});
          currentMid.push({value: this.props.studentsData[studentsIndex].midSemesterMarks.mentor.presentation});
          currentMid.push({value: this.props.studentsData[studentsIndex].midSemesterMarks.mentor.viva});
          currentMid.push({value: this.props.studentsData[studentsIndex].midSemesterMarks.mentor.implementation});
          currentMid.push({value: this.props.studentsData[studentsIndex].midSemesterMarks.mentor.interaction});
          currentMid.push({value: this.props.studentsData[studentsIndex].midSemesterMarks.mentor.remarks});
          midSemesterMarks.push(currentMid)
        
          currentEnd.push({value: this.props.studentsData[studentsIndex].name});
          currentEnd.push({value: this.props.studentsData[studentsIndex].sid});
          currentEnd.push({value: this.props.studentsData[studentsIndex].endSemesterMarks.mentor.presentation});
          currentEnd.push({value: this.props.studentsData[studentsIndex].endSemesterMarks.mentor.viva});
          currentEnd.push({value: this.props.studentsData[studentsIndex].endSemesterMarks.mentor.implementation});
          currentEnd.push({value: this.props.studentsData[studentsIndex].endSemesterMarks.mentor.interaction});
          currentEnd.push({value: this.props.studentsData[studentsIndex].endSemesterMarks.mentor.remarks});
          endSemesterMarks.push(currentEnd);
      }
      this.state = {
          gridMid: midSemesterMarks,
          gridEnd: endSemesterMarks,
      };
      console.log(this.state);
  }
  
  onCellsChangedMid = (changes) => {
    // console.log(changes);
    const gridMid = this.state.gridMid.map((row) => [...row]);
    changes.forEach(({cell, row, col, value}) => {
      gridMid[row][col] = {...gridMid[row][col], value};
    });
    this.setState({gridMid: gridMid});
  };
  
  onCellsChangedEnd = (changes) => {
    // console.log(changes);
    const gridEnd = this.state.gridEnd.map((row) => [...row]);
    changes.forEach(({cell, row, col, value}) => {
      gridEnd[row][col] = {...gridEnd[row][col], value};
    });
    this.setState({gridEnd: gridEnd});
  };
  
  render(){
    return (
        <Box m={2}>
          <h1>Mid-Semester Evaluation</h1>
          <ReactDataSheet
              data={this.state.gridMid}
              valueRenderer={(cell) => cell.value}
              onCellsChanged={(e) => this.onCellsChangedMid(e)}
              sheetRenderer={(props) => (
                  <Table className={props.className + " my-awesome-extra-class"}>
                    <TableHead>
                      <TableRow>
                        {InputGridHeaders.map((col, index) => (
                            <TableCell key={index}>{col}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>{props.children}</TableBody>
                  </Table>
              )}
          />
          <h1>End-Semester Evaluation</h1>
          <ReactDataSheet
              data={this.state.gridEnd}
              valueRenderer={(cell) => cell.value}
              onCellsChanged={(e) => this.onCellsChangedEnd(e)}
              sheetRenderer={(props) => (
                  <Table className={props.className + " my-awesome-extra-class"}>
                    <TableHead>
                      <TableRow>
                        {InputGridHeaders.map((col, index) => (
                            <TableCell key={index}>{col}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>{props.children}</TableBody>
                  </Table>
              )}
          />
        </Box>
    );
  }
}

function mapStateToProps(){
  return {};
}

export default connect(mapStateToProps)(Sheet);
