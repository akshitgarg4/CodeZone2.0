import React, { useState } from "react";
import {
  // main component
  Chart,
  // graphs
  Bars,
  Lines,
  Ticks,
} from "rumble-charts";

import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import Slider from "@mui/material/Slider";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function valuetext(value) {
  return `${value} Marks`;
}

export default function GradeResults (props) {
  console.log(props.payload);
  const studentScores = props.payload;

  let datasetSize = studentScores.length;
  let mean = 0;
  let sumOfScores = 0;
  let copyOfScores = studentScores;

  //Calculate mean of scores
  for (let i = 0; i < studentScores.length; i++) {
    sumOfScores += studentScores[i];
  }
  mean = sumOfScores / datasetSize;

  //Calculate the standard deviation

  // Assigning (value - mean) ^ 2 to every array item
  copyOfScores = copyOfScores.map((k) => {
    return (k - mean) ** 2;
  });

  // Calculating the sum of updated array
  let sum = copyOfScores.reduce((acc, curr) => acc + curr, 0);

  // Standered deviation
  // eslint-disable-next-line
  const [standardDeviation, setstandardDeviation] = useState(
    Math.sqrt(sum / copyOfScores.length)
  );

  const [marksA, setmarksA] = useState(mean + 1.5 * standardDeviation);
  const [marksBP, setmarksBP] = useState(mean + 1 * standardDeviation);
  const [marksB, setmarksB] = useState(mean + 0.5 * standardDeviation);
  const [marksCP, setmarksCP] = useState(mean);
  const [marksC, setmarksC] = useState(mean - 0.5 * standardDeviation);
  const [marksD, setmarksD] = useState(mean - 1 * standardDeviation);
  const [marksF, setmarksF] = useState(mean - 1.5 * standardDeviation);

  let noOfAPGrades = 0;
  let noOfAGrades = 0;
  let noOfBPGrades = 0;
  let noOfBGrades = 0;
  let noOfCPGrades = 0;
  let noOfCGrades = 0;
  let noOfDGrades = 0;
  let noOfFGrades = 0;
  for (let i = 0; i < studentScores.length; i++) {
    if (studentScores[i] >= marksA) {
      noOfAPGrades += 1;
    } else if (studentScores[i] >= marksBP && studentScores[i] < marksA) {
      noOfAGrades += 1;
    } else if (studentScores[i] >= marksB && studentScores[i] < marksBP) {
      noOfBPGrades += 1;
    } else if (studentScores[i] >= marksCP && studentScores[i] < marksB) {
      noOfBGrades += 1;
    } else if (studentScores[i] >= marksC && studentScores[i] < marksCP) {
      noOfCPGrades += 1;
    } else if (studentScores[i] >= marksD && studentScores[i] < marksC) {
      noOfCGrades += 1;
    } else if (studentScores[i] >= marksF && studentScores[i] < marksD) {
      noOfDGrades += 1;
    } else if (studentScores[i] < marksF) {
      noOfFGrades += 1;
    }
  }

  let series = [
    {
      data: [
        noOfAPGrades,
        noOfAGrades,
        noOfBPGrades,
        noOfBGrades,
        noOfCPGrades,
        noOfCGrades,
        noOfDGrades,
        noOfFGrades,
      ],
    },
  ];

  // eslint-disable-next-line
  const minDistance = 1;

  const [value, setValue] = React.useState([
    marksA,
    marksBP,
    marksB,
    marksCP,
    marksC,
    marksD,
    marksF,
  ]);
  // eslint-disable-next-line
  const handleChange = (event, newValue, activeThumb) => {
    console.log(newValue);
    setValue(newValue);
    setmarksF(newValue[0]);
    setmarksD(newValue[1]);
    setmarksC(newValue[2]);
    setmarksCP(newValue[3]);
    setmarksB(newValue[4]);
    setmarksBP(newValue[5]);
    setmarksA(newValue[6]);
  };

  return (
    <div>
      <Box m={4}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <Grid
            item
            xs={false}
            sm={3}
            md={4}
            sx={{
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Grid
              sx={{
                pt: 8,
                pb: 6,
              }}
              m={4}
              direction="column"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Grid item m={2}>
                <Typography
                  component="h3"
                  variant="h6"
                  align="center"
                  color="text.primary"
                >
                  Grade Visualizer
                </Typography>
                <Typography
                  variant="h7"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Adjust the mark points for an ideal normal distribution
                </Typography>
              </Grid>
              <Chart width={250} height={250} series={series}>
                <Bars innerPadding={5} groupPadding={10} />
                <Lines
                  colors={["#007696"]}
                  interpolation="cardinal"
                  lineAttributes={{
                    strokeLinecap: "round",
                    strokeWidth: 5,
                  }}
                  lineWidth={0}
                />
                <Ticks
                  axis="x"
                  ticks={[
                    {
                      label: "A+",
                      x: 0,
                    },
                    {
                      label: "A",
                      x: 1,
                    },
                    {
                      label: "B+",
                      x: 2,
                    },
                    {
                      label: "B",
                      x: 3,
                    },
                    {
                      label: "C+",
                      x: 4,
                    },
                    {
                      label: "C",
                      x: 5,
                    },
                    {
                      label: "D",
                      x: 6,
                    },
                    {
                      label: "F",
                      x: 7,
                    },
                  ]}
                />
              </Chart>
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
              ></Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={9}
            md={8}
            component={Paper}
            elevation={6}
            square
          >
            <Typography
              variant="h7"
              align="center"
              color="text.secondary"
              paragraph
            >
              Drag the points to set the minimum marks for the respective grade
            </Typography>
            <Box sx={{ width: 1 }}>
              <Slider
                getAriaLabel={() => "Grade Shift"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
              />
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Grade</TableCell>
                    <TableCell align="right">Minimum Marks</TableCell>
                    <TableCell align="right">Maximum Marks</TableCell>
                    <TableCell align="right">No of Students</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>A+</TableCell>
                    <TableCell align="right">{marksA}</TableCell>
                    <TableCell align="right">100</TableCell>
                    <TableCell align="right">{noOfAPGrades}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>A</TableCell>
                    <TableCell align="right">{marksBP}</TableCell>
                    <TableCell align="right">{marksA}</TableCell>
                    <TableCell align="right">{noOfAGrades}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>B+</TableCell>
                    <TableCell align="right">{marksB}</TableCell>
                    <TableCell align="right">{marksBP}</TableCell>
                    <TableCell align="right">{noOfBPGrades}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>B</TableCell>
                    <TableCell align="right">{marksCP}</TableCell>
                    <TableCell align="right">{marksB}</TableCell>
                    <TableCell align="right">{noOfBGrades}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>C+</TableCell>
                    <TableCell align="right">{marksC}</TableCell>
                    <TableCell align="right">{marksCP}</TableCell>
                    <TableCell align="right">{noOfCPGrades}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>C</TableCell>
                    <TableCell align="right">{marksD}</TableCell>
                    <TableCell align="right">{marksC}</TableCell>
                    <TableCell align="right">{noOfCGrades}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>D</TableCell>
                    <TableCell align="right">{marksF}</TableCell>
                    <TableCell align="right">{marksD}</TableCell>
                    <TableCell align="right">{noOfDGrades}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>F</TableCell>
                    <TableCell align="right">0</TableCell>
                    <TableCell align="right">{marksF}</TableCell>
                    <TableCell align="right">{noOfFGrades}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

