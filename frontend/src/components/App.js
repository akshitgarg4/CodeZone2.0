import React from "react";
import { connect } from "react-redux";
import Page404 from "./Page404/Page404";
import Nav from "./Navbar/Nav";
import Login from "./Login/Login";
import Classroom from "./Classroom/Classroom";
import Mentor from "./MentorPage/MentorPage";
import ViewData from "./Classroom/ViewData";
import ViewMarks from "./Classroom/ViewMarks";

import { Paper } from "@mui/material";
// @ts-ignore
//to decode the token
import jwt_decode from "jwt-decode";
import { authenticateUser } from "../actions/auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
            {!auth.isLoggedIn && <Route exact path="/" element={<Login />} />}
            {auth.isLoggedIn && (
              <Route exact path="/" element={<Classroom />} />
            )}
            {auth.isLoggedIn && <Route path="/mentor" element={<Mentor />} />}
            {auth.isLoggedIn && (
              <Route path="/View-Data/:dataId" element={<ViewData />} />
            )}
            {auth.isLoggedIn && (
              <Route path="/View-Marks/:dataId" element={<ViewMarks />} />
            )}
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
