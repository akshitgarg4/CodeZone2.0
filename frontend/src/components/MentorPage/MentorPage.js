import {Grid } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import Sheet from "./Sheet/Sheet";
import Todo from "./Todo/Todo";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputBase } from "@mui/material";

const MentorPage = (props) => {
  console.log(props.auth.inProgress);
  return (
    <Grid container>
      <Box
        m={3}
        sx={{
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <TextField fullWidth label="Group No" id="fullWidth" />
      </Box>
      <Sheet />
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(MentorPage);
