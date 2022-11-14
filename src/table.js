import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function BasicTable({row, column, children} ) {
  return (
    <TableContainer component={Paper} id="mytable">
      <Table sx={{ width: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell></TableCell>
            <TableCell align="right">{`Column ${column}`}</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell align="right">{`Row ${row}`}</TableCell>
            <TableCell>{children}</TableCell>
            </TableRow>
        
        </TableBody>
      </Table>
    </TableContainer>
  );
}