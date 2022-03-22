import React from "react";
import { connect } from "react-redux";
import CreateTodo from './CreateTodo';
import Table from './Table';

const Todo = (props) => {
  return (
    <div>
        <CreateTodo />
        <Table />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Todo);
