import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "../../../actions/actionCreator";
import { bindActionCreators } from "redux";

// mui
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todotext: "",
    };
    this.onChangeTodoText = this.onChangeTodoText.bind(this);
  }

  onChangeTodoText(e) {
    this.setState({
      todotext: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <div>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item m={1}>
              <TextField
                onChange={this.onChangeTodoText}
                value={this.state.todotext}
                type="text"
                id="outlined-basic"
                variant="filled"
                placeholder="add todo here"
              />
            </Grid>
            <Grid item m={1}>
              <Button
                variant="contained"
                onClick={() => this.setState({ todotext: "" })}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  this.props.addTodo(this.state.todotext);
                  this.setState({ todotext: "" });
                }}
              >
                Add Todo
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addTodo,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(CreateTodo);
