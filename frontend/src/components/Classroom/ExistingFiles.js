import React, {useState, useEffect} from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function ExistingFiles(props) {
  const [existingData,setExistingData] = useState([
      {'S. No.' : '1', 'File Name' : 'ABC', 'Date Uploaded': 'Date', 'Time Uploaded': 'Time', 'Description' :'Desc'}
  ]);
  useEffect(() => {
    // fetch('/api/past_uploads', {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     }
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);
    //       if (data?.success) {
    //         setExistingData(data?.data);
    //       }
    //     });
  }, [props.data])
  
  return (
    <div>
        Past Uploaded Files!!




    </div>
  )
}
