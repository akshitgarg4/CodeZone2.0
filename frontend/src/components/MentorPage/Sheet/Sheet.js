import React from "react";
import ReactDataSheet from "react-datasheet";
import { connect } from "react-redux";
import "react-datasheet/lib/react-datasheet.css";

//Mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const InputGridHeaders = [
  "Name",
  "Sid",
  "Presentation",
  "Viva",
  "Implementation",
  "Interaction",
  "Remarks",
];

class Sheet extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props, "RRRR");
    let midSemesterMarks = [];
    let endSemesterMarks = [];

    for (
      let studentsIndex = 0;
      studentsIndex < this.props.studentsData.length;
      studentsIndex++
    ) {
      let currentMid = [];
      let currentEnd = [];
      currentMid.push({ value: this.props.studentsData[studentsIndex].name });
      currentMid.push({ value: this.props.studentsData[studentsIndex].sid });
      currentMid.push({
        value:
          this.props.studentsData[studentsIndex].midSemesterMarks.mentor
            .presentation,
      });
      currentMid.push({
        value:
          this.props.studentsData[studentsIndex].midSemesterMarks.mentor.viva,
      });
      currentMid.push({
        value:
          this.props.studentsData[studentsIndex].midSemesterMarks.mentor
            .implementation,
      });
      currentMid.push({
        value:
          this.props.studentsData[studentsIndex].midSemesterMarks.mentor
            .interaction,
      });
      currentMid.push({
        value:
          this.props.studentsData[studentsIndex].midSemesterMarks.mentor
            .remarks,
      });
      midSemesterMarks.push(currentMid);

      currentEnd.push({ value: this.props.studentsData[studentsIndex].name });
      currentEnd.push({ value: this.props.studentsData[studentsIndex].sid });
      currentEnd.push({
        value:
          this.props.studentsData[studentsIndex].endSemesterMarks.mentor
            .presentation,
      });
      currentEnd.push({
        value:
          this.props.studentsData[studentsIndex].endSemesterMarks.mentor.viva,
      });
      currentEnd.push({
        value:
          this.props.studentsData[studentsIndex].endSemesterMarks.mentor
            .implementation,
      });
      currentEnd.push({
        value:
          this.props.studentsData[studentsIndex].endSemesterMarks.mentor
            .interaction,
      });
      currentEnd.push({
        value:
          this.props.studentsData[studentsIndex].endSemesterMarks.mentor
            .remarks,
      });
      endSemesterMarks.push(currentEnd);
    }
    this.state = {
      groupID: this.props.groupID,
      groupNumber: this.props.groupNumber,
      gridMid: midSemesterMarks,
      gridEnd: endSemesterMarks,
      error: "",
      success: "",
    };
    console.log(this.state);
  }

  saveChanges = () => {
    let midSemesterMarks = {
      presentation: [],
      viva: [],
      implementation: [],
      interaction: [],
      remarks: [],
    };
    let endSemesterMarks = {
      presentation: [],
      viva: [],
      implementation: [],
      interaction: [],
      remarks: [],
    };
    for (
      let studentsIndex = 0;
      studentsIndex < this.props.studentsData.length;
      studentsIndex++
    ) {
      midSemesterMarks.presentation.push(
        parseFloat(this.state.gridMid[studentsIndex][2].value)
      );
      midSemesterMarks.viva.push(
        parseFloat(this.state.gridMid[studentsIndex][3].value)
      );
      midSemesterMarks.implementation.push(
        parseFloat(this.state.gridMid[studentsIndex][4].value)
      );
      midSemesterMarks.interaction.push(
        parseFloat(this.state.gridMid[studentsIndex][5].value)
      );
      midSemesterMarks.remarks.push(this.state.gridMid[studentsIndex][6].value);

      endSemesterMarks.presentation.push(
        parseFloat(this.state.gridEnd[studentsIndex][2].value)
      );
      endSemesterMarks.viva.push(
        parseFloat(this.state.gridEnd[studentsIndex][3].value)
      );
      endSemesterMarks.implementation.push(
        parseFloat(this.state.gridEnd[studentsIndex][4].value)
      );
      endSemesterMarks.interaction.push(
        parseFloat(this.state.gridEnd[studentsIndex][5].value)
      );
      endSemesterMarks.remarks.push(this.state.gridEnd[studentsIndex][6].value);
    }
    console.log(endSemesterMarks, midSemesterMarks);
    fetch(`/data/mentor/marksSave/${this.state.groupID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("CodeZone2_Token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        midSemesterMarks: midSemesterMarks,
        endSemesterMarks: endSemesterMarks,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          this.setState({
            success: "Marks Saved!!",
          });
          setTimeout(() => {
            this.setState({
              success: "",
            });
          }, 8000);
        } else {
          this.setState({
            error: "rror while saving marks!!",
          });
          setTimeout(() => {
            this.setState({
              error: "",
            });
          }, 8000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onCellsChangedMid = (changes) => {
    // console.log(changes);
    const gridMid = this.state.gridMid.map((row) => [...row]);
    changes.forEach(({ cell, row, col, value }) => {
      gridMid[row][col] = { ...gridMid[row][col], value };
    });
    this.setState({ gridMid: gridMid });
  };

  onCellsChangedEnd = (changes) => {
    // console.log(changes);
    const gridEnd = this.state.gridEnd.map((row) => [...row]);
    changes.forEach(({ cell, row, col, value }) => {
      gridEnd[row][col] = { ...gridEnd[row][col], value };
    });
    this.setState({ gridEnd: gridEnd });
  };

  render() {
    return (
      <Box m={2}>
        {(this.props.show === "Midsem" || this.props.show === "Both") && (
          <>
            <h1 style={{ marginLeft: "33%" }}>Mid-Semester Evaluation</h1>
            <ReactDataSheet
              data={this.state.gridMid}
              valueRenderer={(cell) => cell.value}
              onCellsChanged={(e) => this.onCellsChangedMid(e)}
              sheetRenderer={(props) => (
                <Table className={props.className + " my-awesome-extra-class"}>
                  <TableHead>
                    <TableRow>
                      {InputGridHeaders.map((col, index) => (
                        <TableCell key={index}  style={{fontWeight:700}}>{col}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>{props.children}</TableBody>
                </Table>
              )}
            />
          </>
        )}
        {(this.props.show === "Endsem" || this.props.show === "Both") && (
          <>
            <h1 style={{ marginLeft: "33%" }}>End-Semester Evaluation</h1>
            <ReactDataSheet
              data={this.state.gridEnd}
              valueRenderer={(cell) => cell.value}
              onCellsChanged={(e) => this.onCellsChangedEnd(e)}
              sheetRenderer={(props) => (
                <Table className={props.className + " my-awesome-extra-class"}>
                  <TableHead>
                    <TableRow>
                      {InputGridHeaders.map((col, index) => (
                        <TableCell key={index} style={{fontWeight:700}}>{col}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>{props.children}</TableBody>
                </Table>
              )}
            />
          </>
        )}
        <Button
          style={{ marginLeft: "43%", marginTop: 20 }}
          variant="contained"
          onClick={this.saveChanges}
        >
          Save
        </Button>
        {this.state.error && (
          <Snackbar open={true} autoHideDuration={2000}>
            <Alert severity="error" sx={{ width: "100%" }}>
              {this.state.error}
            </Alert>
          </Snackbar>
        )}
        {this.state.success && (
          <Snackbar open={true} autoHideDuration={2000}>
            <Alert severity="success" sx={{ width: "100%" }}>
              {this.state.success}
            </Alert>
          </Snackbar>
        )}
      </Box>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Sheet);
