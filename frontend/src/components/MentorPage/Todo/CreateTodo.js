import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "../../../actions/actionCreator";
import { bindActionCreators } from "redux";

// mui
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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
          <TextField
            onChange={this.onChangeTodoText}
            value={this.state.todotext}
            type="text"
            id="outlined-basic"
            variant="filled"
            placeholder="add todo here"
          />
          <Button
            variant="contained"
            onClick={() => this.setState({ todotext: "" })}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              this.props.addTodo(this.state.todotext);
              this.setState({ todotext: "" });
            }}
          >
            Add Todo
          </Button>
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
