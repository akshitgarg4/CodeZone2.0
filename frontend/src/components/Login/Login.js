import React, {Component} from "react";
import {Navigate} from "react-router-dom";
// import {clearAuth, login} from "../actions/auth";
import {connect} from "react-redux";
import { Link } from "react-router-dom";

// Material UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Paper } from "@mui/material";

class Login extends Component {

    //to clear the error if it comes on reload or whenever the user shifts from this page
    componentWillUnmount() {
        // this.props.dispatch(clearAuth());
    }

    render() {
        // const {inProgress, error, isLoggedIn} = this.props.auth;
        // if (isLoggedIn) {
        //     return <Navigate to="/"/>;
        // }
        return (
          <div>
            <Grid container component="main" sx={{ height: "100vh" }}>
              <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                  backgroundImage:
                    "url(https://source.unsplash.com/featured/?programming)",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: (t) =>
                    t.palette.mode === "light"
                      ? t.palette.grey[50]
                      : t.palette.grey[900],
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
              >
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100vh",
                    m: 2,
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  {/* {error && <div className="alert error-dailog">{error}</div>} */}
                  <Box
                    component="form"
                    onSubmit={this.handleSubmitForm}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    //   disabled={inProgress}
                      id="sign-in"
                    >
                      Sign In
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        // auth: state.auth,
    };
}

export default connect(mapStateToProps)(Login);
