import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableDevice = (device) =>{
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Location</StyledTableCell>
            <StyledTableCell align="right">Created By</StyledTableCell>
            <StyledTableCell align="right">Active</StyledTableCell>
            <StyledTableCell align="right">Created</StyledTableCell>
            <StyledTableCell align="right">DeviceIdNo</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <StyledTableRow key={device.device.name}>
              <StyledTableCell component="th" scope="row">
                {device.device.name}
              </StyledTableCell>
              <StyledTableCell align="right">{device.device.location}</StyledTableCell>
              <StyledTableCell align="right">{device.device.userId}</StyledTableCell>
              <StyledTableCell align="right">{device.device.active.toString()}</StyledTableCell>
              <StyledTableCell align="right">{device.device.createdAt}</StyledTableCell>
              <StyledTableCell align="right">{device.device.deviceIdNo}</StyledTableCell>
            </StyledTableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default TableDevice;