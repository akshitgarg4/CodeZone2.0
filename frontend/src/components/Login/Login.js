import React, {Component} from "react";
// import {clearAuth, login} from "../actions/auth";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import SECRET from "../../credentials/credentials";
// Material UI
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Paper } from "@mui/material";
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

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
        const responseSuccessGoogle = (response) => {
            console.log("Success in google login",response);
            axios({
                method: 'POST',
                url: '/googleLogIn',
                data: {tokenId: response?.tokenId}
            }).then((response)=>{
                console.log(response);
            })
          }
        const responseErrorGoogle = (response) => {
            console.log("Error in google login",response);
          }
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
                  <Box
                    component="form"
                    noValidate
                    sx={{ mt: 1 }}
                  >
                   <GoogleLogin
                        clientId={SECRET.CLIENT_ID}
                        buttonText="Login with Google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={'single_host_origin'}
                        // isSignedIn={true}
                    />
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
