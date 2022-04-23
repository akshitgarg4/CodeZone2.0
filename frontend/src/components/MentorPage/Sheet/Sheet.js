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
    console.log(this.props);
    this.state = {
      gridMid: [
        [
          {value: "Shayan"},
          {value: "18103033"},
          {value: "0"},
          {value: "0"},
          {value: "0"},
          {value: "0"},
          {value: "0"},
        ],
        [
          {value: "Gagan"},
          {value: "18103032"},
          {value: "0"},
          {value: "0"},
          {value: "0"},
          {value: "0"},
          {value: "0"},
        ],
        [
          {value: "Akshit"},
          {value: "18103042"},
          {value: "0"},
          {value: "0"},
          {value: "0"},
          {value: "0"},
          {value: "0"},
        ],
      ],
      gridEnd: [
        [
          {value: "Shayan"},
          {value: "18103033"},
          {value: "0"},
          {value: "0"},
          {value: "0"},
          {value: "0"},
          {value: "0"},
        ],
        [
          {value: "Gagan"},
          {value: "18103032"},
          {value: "0"},
          {value: "0"},
          {value: "0"},
          {value: "0"},
          {value: "0"},
        ],
        [
          {value: "Akshit"},
          {value: "18103042"},
          {value: "0"},
          {value: "0"},
          {value: "0"},
          {value: "0"},
          {value: "0"},
        ],
      ],
    };
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
