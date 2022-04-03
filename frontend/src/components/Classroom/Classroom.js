import React, {useState} from "react";
import {read,utils} from 'xlsx';
import ExistingFiles from './ExistingFiles';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


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
  return <div style={{width:'100vw',height:'100vh', padding:'50px'}}>
    Upload New Excell File!!<br></br>
    <input type="file" onChange={(e) => handleFile(e)} /><br></br>
    <input type='text' onChange={(e) => handleInput(e)} placeholder="Brief Description" /><br></br>
    <input type="Submit" onClick={handleSubmit} />
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

    <ExistingFiles data={data} />
  </div>;
}
