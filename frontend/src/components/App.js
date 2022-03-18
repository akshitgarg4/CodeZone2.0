import React from "react";
import { connect } from "react-redux";
import Page404 from "./Page404/Page404";
import Nav from "./Navbar/Nav";
import Login from "./Login/Login";

import { Paper} from '@mui/material';
// @ts-ignore
//to decode the token
// import jwt_decode from "jwt-decode";
// import { authenticateUser } from "../actions/auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

class App extends React.Component {

  componentDidMount() {
  }

  render() {
    // const { auth } = this.props;
    return (
        <Paper>
          <Router>
            <Nav />
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route component={Page404} />
            </Routes>
          </Router>
        </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    // auth: state.auth,
  };
}

export default connect(mapStateToProps)(App);

