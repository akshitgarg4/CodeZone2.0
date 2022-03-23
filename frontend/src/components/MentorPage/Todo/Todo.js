import React from "react";
import { connect } from "react-redux";
import CreateTodo from './CreateTodo';
import TodoTable from "./TodoTable";

import { Grid, Paper } from "@mui/material";

const Todo = (props) => {
  return (
    <Paper elevation={3}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          {" "}
          <CreateTodo />
        </Grid>
        <Grid item>
          {" "}
          <TodoTable />
        </Grid>
      </Grid>
    </Paper>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Todo);
