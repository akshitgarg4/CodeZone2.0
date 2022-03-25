import {Grid } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import Sheet from "./Sheet/Sheet";
import Todo from "./Todo/Todo";

const MentorPage = (props) => {
  console.log(props.auth.inProgress);
  return (
    <Grid container>
      <Grid item xs={7} m={1}>
          <Sheet />
      </Grid>
      <Grid item xs={4} m={4}>
        <Todo />
      </Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(MentorPage);
