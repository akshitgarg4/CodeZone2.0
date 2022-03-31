import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteTodo, fetchAllTodo, setVisibilityFilter, toggleTodo,} from "../../../actions/actionCreator";
import {SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED,} from "../../../actions/actionTypes";
import {bindActionCreators} from "redux";

//Mui
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

class TodoTable extends Component{
  componentWillMount(){
    this.props.fetchAllTodo();
  }
  
  render(){
    return (
        <div>
          <FormGroup row>
            <FormControlLabel
                control={<Checkbox defaultChecked/>}
                label="All"
                onClick={() => this.props.setVisibilityFilter(SHOW_ALL)}
            />
            <FormControlLabel
            control={<Checkbox deafultUnchecked />}
            label="Completed"
            onClick={() => this.props.setVisibilityFilter(SHOW_COMPLETED)}
          />
          <FormControlLabel
            control={<Checkbox deafultUnchecked />}
            label="Active"
            onClick={() => this.props.setVisibilityFilter(SHOW_ACTIVE)}
          />
        </FormGroup>
        {this.props.todos.length !== 0 ? (
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Todos</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.todos.map((todo) => (
                    <TableRow
                      key={todo.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <td
                          style={{
                            textDecoration: todo.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {todo.text}{" "}
                          {todo.completed === true ? "(completed)" : ""}
                        </td>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Button onClick={() => this.props.deleteTodo(todo.id)}>
                          Delete
                        </Button>
                        <Button onClick={() => this.props.toggleTodo(todo.id)}>
                          Done
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <div>
            Todo List is empty or Filter results show no results
          </div>
        )}{" "}
      </div>
    );
  }
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case SHOW_ALL:
      return todos;
    case SHOW_COMPLETED:
      return todos.filter((t) => t.completed);
    case SHOW_ACTIVE:
      return todos.filter((t) => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
      {
        deleteTodo,
        toggleTodo,
        setVisibilityFilter,
        fetchAllTodo,
      },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);
