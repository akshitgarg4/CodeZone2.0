import React from "react";
import { connect } from "react-redux";
import Page404 from "./Page404/Page404";
import Nav from "./Navbar/Nav";
import Login from "./Login/Login";
import Classroom from "./Coordinator/Coordinator_Page";
import Mentor from "./MentorPage/MentorPage";
import ViewData from "./Coordinator/View_File";
import ViewMarks from "./Coordinator/View_Marks";

import { Paper } from "@mui/material";
// @ts-ignore
//to decode the token
import jwt_decode from "jwt-decode";
import { authenticateUser } from "../actions/auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EvaluatorPage from "./Evaluator/EvaluatorPage";
import AddMarks from "./Evaluator/AddMarks";

class App extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem("CodeZone2_Token");
    if (token) {
      const user = jwt_decode(token);
      if (user) {
        this.props.dispatch(authenticateUser(user));
      }
    }
  }

  render() {
    const { auth } = this.props;
    return (
      <Paper>
        <Router>
          <Nav />
          <Routes>
            <Route
              exact
              path="/"
              element={!auth?.isLoggedIn ? <Login /> : <Classroom />}
            />
            <Route
              path="/mentor/:recordId"
              element={!auth?.isLoggedIn ? <Login /> : <Mentor />}
            />
            <Route
              path="/evaluator/:recordId"
              element={!auth?.isLoggedIn ? <Login /> : <EvaluatorPage />}
            />
            <Route
              path="/View-Data/:dataId"
              element={!auth?.isLoggedIn ? <Login /> : <ViewData />}
            />
            <Route
              path="/View-Marks/:dataId"
              element={!auth?.isLoggedIn ? <Login /> : <ViewMarks />}
            />
            <Route
              path="/add-marks/:groupId"
              element={!auth?.isLoggedIn ? <Login /> : <AddMarks />}
            />
            <Route component={Page404} />
          </Routes>
        </Router>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(App);
