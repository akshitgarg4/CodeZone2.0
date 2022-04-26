import * as React from 'react';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import MOCK_DATA from './MOCK_DATA.json'

const StyledTableCell = styled(TableCell)(({theme}) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
        border: "0.1px solid rgba(224, 224, 224, 1)",
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));
export default function Table2() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);
  const evaluators = {'evaluator_1':'Akshit Garg','evaluator_2':'Gaganpreet Singh'};

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const midColSpan = Object.keys(evaluators).length;
  const endColSpan = Object.keys(evaluators).length; 
  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                
              </StyledTableCell>
              <StyledTableCell align="center">
              </StyledTableCell>
              <StyledTableCell align="center">
              </StyledTableCell>
              <StyledTableCell align="center">
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={3*midColSpan}>
                Evaluation Mid Semester
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={4*endColSpan}>
                Evaluation End Semester 
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={8}>
                Mentor Evaluation
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={3}>
                Total 
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">
              Group Number
              </StyledTableCell>
              <StyledTableCell align="center">
                  Name
              </StyledTableCell>
              <StyledTableCell align="center">
                  SID
              </StyledTableCell>
              <StyledTableCell align="center">
                  Mentor
              </StyledTableCell>
              {Object.entries(evaluators).map((key, i) => {
      return (
        <StyledTableCell align="center" colSpan={3} key={i}>
                {key[1]}
        </StyledTableCell>
      );
    })}
    {Object.entries(evaluators).map((key, i) => {
      return (
        <StyledTableCell align="center" colSpan={4} key={i}>
                {key[1]}
        </StyledTableCell>
      );
    })}
    <StyledTableCell align="center" colSpan={4}>
                Mid Sem 
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={4}>
                End Sem 
              </StyledTableCell>
              <StyledTableCell align="center">
                Mid Sem Total
              </StyledTableCell>
              <StyledTableCell align="center">
                End Sem Total
              </StyledTableCell>
              <StyledTableCell align="center">
                Final Marks
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">
              </StyledTableCell>
              <StyledTableCell align="center">
              </StyledTableCell>
              <StyledTableCell align="center">
              </StyledTableCell>
              <StyledTableCell align="center">
              </StyledTableCell>
              {Object.entries(evaluators).map((key, i) => {
      return (
          <>
        <StyledTableCell align="center" key={i}>
                PPT
        </StyledTableCell>
        <StyledTableCell align="center" key={i}>
        Viva
</StyledTableCell>
<StyledTableCell align="center" key={i}>
                Impl
        </StyledTableCell>
        </>
      );
    })}
    {Object.entries(evaluators).map((key, i) => {
      return (
        <>
        <StyledTableCell align="center" key={i}>
                PPT
        </StyledTableCell>
        <StyledTableCell align="center" key={i}>
        Viva
</StyledTableCell>
<StyledTableCell align="center" key={i}>
                Impl
        </StyledTableCell>
        <StyledTableCell align="center" key={i}>
                Rep
        </StyledTableCell>
        </>
      );
    })}
    <StyledTableCell align="center">
        PPT
              </StyledTableCell>
              <StyledTableCell align="center">
                  Viva
              </StyledTableCell>
              <StyledTableCell align="center">
                  Impl
              </StyledTableCell>
              <StyledTableCell align="center">
                  Interaction
              </StyledTableCell>
              <StyledTableCell align="center">
                  PPT
              </StyledTableCell>
              <StyledTableCell align="center">
                  Viva
              </StyledTableCell>
              <StyledTableCell align="center">
                  Impl
              </StyledTableCell>
              <StyledTableCell align="center">
                  Interaction
              </StyledTableCell>
              <StyledTableCell align="center">
              </StyledTableCell>
              <StyledTableCell align="center">
              </StyledTableCell>
              <StyledTableCell align="center">
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_DATA
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => {
                return (
                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <StyledTableCell align="center">
                          {row?.GroupNumber}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                          {row?.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                          {row?.sid}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                          {row?.mentor}
                      </StyledTableCell>
                      {Object.keys(row?.midSemesterMarks).map((key,index) => {
                          return( key === 'mentor' ?<> </>: <>
                          <StyledTableCell align="center" key={`a+${index}`}>
                          {row?.midSemesterMarks?.[key]?.presentation}
                      </StyledTableCell>
                      <StyledTableCell align="center" key={`b+${index}`}>
                          {row?.midSemesterMarks?.[key]?.viva}
                      </StyledTableCell>
                      <StyledTableCell align="center" key={`c+${index}`}>
                          {row?.midSemesterMarks?.[key]?.implementation}
                      </StyledTableCell> </>)
                      })}
                      {Object.keys(row?.endSemesterMarks).map((key,index) => {
                          return( key === 'mentor' ?<> </>: <>
                          <StyledTableCell align="center" key={`aa+${index}`}>
                          {row?.endSemesterMarks?.[key]?.presentation}
                      </StyledTableCell>
                      <StyledTableCell align="center" key={`ba+${index}`}>
                          {row?.endSemesterMarks?.[key]?.viva}
                      </StyledTableCell>
                      <StyledTableCell align="center" key={`ca+${index}`}>
                          {row?.endSemesterMarks?.[key]?.implementation}
                      </StyledTableCell>
                      <StyledTableCell align="center" key={`da+${index}`}>
                          {row?.endSemesterMarks?.[key]?.report}
                      </StyledTableCell> </>)
                      })}
                      <StyledTableCell align="center">
                          {row?.midSemesterMarks?.['mentor']?.presentation}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                          {row?.midSemesterMarks?.['mentor']?.viva}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                          {row?.midSemesterMarks?.['mentor']?.implementation}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                          {row?.midSemesterMarks?.['mentor']?.interaction}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                          {row?.endSemesterMarks?.['mentor']?.presentation}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                          {row?.endSemesterMarks?.['mentor']?.viva}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                          {row?.endSemesterMarks?.['mentor']?.implementation}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                          {row?.endSemesterMarks?.['mentor']?.interaction}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                          {row?.totalMarks?.midSemester}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                          {row?.totalMarks?.endSemester}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                          {row?.totalMarks?.totalMarks}
                      </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={MOCK_DATA.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
