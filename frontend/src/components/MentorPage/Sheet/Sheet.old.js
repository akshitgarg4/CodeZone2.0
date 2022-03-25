import React from "react";
import ReactDataSheet from "react-datasheet";
import { connect } from "react-redux";
import "react-datasheet/lib/react-datasheet.css";

//Mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";

const InputGridHeaders = ["Name", "Sid"];
const InputGridInput = [
  ["Shayan", "18103033"],
  ["Gagan", "18103032"],
];
const InputGridLayout = { x: 2, y: 10 };

class Sheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [
        ["Shayan", "18103033"],
        ["Gagan", "18103032"],
      ],
    };
  }

  onContextMenu = (e) => {
    e.preventDefault();
    console.log("Show right-click menu options here: " + e.pageX, e.pageY);
  };

  onCellsChanged = (changes) => {
    // console.log(changes);
    const grid = this.state.grid.map((row) => [...row]);
    changes.forEach(({ cell, row, col, value }) => {
      grid[row][col] = { ...grid[row][col], value };
    });
    this.setState({ grid: grid });
  };

  render() {
    return (
      <Box>
        <h1>Mentor Group Sheet</h1>
        <ReactDataSheet
          data={this.state.grid}
          readOnly
          valueRenderer={(cell) => cell.value}
          onCellsChanged={(e) => this.onCellsChanged(e)}
          onContextMenu={(e) => this.onContextMenu(e)}
          sheetRenderer={(props) => (
            <div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    {InputGridHeaders.map((col, index) => (
                      <TableCell component="th" scope="row" key={index}>
                        {col}
                      </TableCell>
                    ))}
                  </TableHead>
                  <TableBody>
                    {this.state.grid.map((row) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {row.map((vals) => (
                          <TableCell component="th" scope="row">
                            {vals}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        />
      </Box>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Sheet);
