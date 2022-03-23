import React from "react";
import { connect } from "react-redux";
import CreateTodo from './CreateTodo';
import TodoTable from "./TodoTable";

const Todo = (props) => {
  return (
    <div>
      <CreateTodo />
      <TodoTable />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Todo);
