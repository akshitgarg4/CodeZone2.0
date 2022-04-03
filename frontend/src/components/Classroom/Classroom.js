import React, {useState} from "react";
import {read,utils} from 'xlsx';
import ExistingFiles from './ExistingFiles';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export default function Classroom() {
  const [fileName,setFileName] = useState(null);
  const [error,setError] = useState('');
  const [success,setSuccess] = useState('');
  const [data,setData] = useState([]);
  const [desc,setDesc] = useState('');

  const handleInput = (e) => {
    setDesc(e.target.value);
  }
  const handleSubmit = () =>{
    if(fileName && data){
      //send fileName, data(array of objects) and description
      // fetch('/api/new_upload', {
        // method: "POST",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    // Authorization: `Bearer ${localStorage.getItem("CodeZone2.0")}`,
    //     }
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);
    //       if (data?.success) {setFileName(null);
  // setDesc('');
    //       }
    //     });


    }

  }
  const handleFile = async (e) =>{
    console.log(e.target.files[0])
    if(e.target.files[0] && e.target.files[0].name){
      let parts = e.target.files[0].name.split('.');
      if(parts && parts.length > 1){
          let ext = parts[parts.length - 1];
          console.log(ext);
          switch(ext.toLowerCase()){
              case 'xlsx':
                  {const file = e.target.files[0];
                    setFileName(file.name);
                    const data = await file.arrayBuffer();
                    const workBook = read(data);
                    const worksheet = workBook.Sheets[workBook.SheetNames[0]];
                    const jsonData = utils.sheet_to_json(worksheet);
                    console.log(jsonData);
                    setData(jsonData);
                      setSuccess("File Uploaded successfully !!!");  
                      setTimeout(()=>{
                          setSuccess('');
                      },6000)
                  break;
               }
              default: 
               setError("File not of right format");  
               setTimeout(()=>{
                  setError('');
              },6000)
              break;  
            }}}
  }
  return (
  <div style={{width:'100vw',height:'100vh'}}>
    <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={4}
                square
              >
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "auto",
                    m: 2,
                  }}
                >
                  <Typography component="h1" variant="h5">
                  Upload New Excell File!!
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
    <TextField
                            margin="normal"
                            fullWidth
                            name="file"
                            type="file"
                            id="file"
                            onChange = {(e) => handleFile(e)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="desc"
                            label="Description"
                            type="text"
                            id="desc"
                            autoComplete="desc"
                            onChange={(e)=>{handleInput(e.target.value)}}
                        />

    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      id="upload"
                    >
                      Upload
                    </Button>
                    </Box>
    {error && <Snackbar open={true} autoHideDuration={2000}>
                        <Alert severity="error" sx={{ width: '100%' }}>
                        {error}
                        </Alert>
                    </Snackbar>}
                    {success && <Snackbar open={true} autoHideDuration={2000}>
                        <Alert severity="success" sx={{ width: '100%' }}>
                        {success}
                        </Alert>
                    </Snackbar>}
</Box>
    <ExistingFiles data={data} />
  </Grid>
  </div>);
}
