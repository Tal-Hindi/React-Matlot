
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function SystemAdmin({appUsers}) {

    const createData = (username, fullname, birthday, address, email) => {
        return { username, fullname, birthday, address, email };
    }

    
    const createTable = () => {
        const rows = [];
        appUsers.forEach(element => {
            rows.push(
                createData(element.username, `${element.firstname +" "+ element.lastname}`, element.birthday, `${element.city +", " + element.street +", " + element.houseNumber}`, element.email)
            )
            
        })
        return rows;
    }
    
    const rows = createTable();
    
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1000}} aria-label="simple table" >
                <TableHead> 
                    <TableRow >
                        <TableCell align="right" style={{backgroundColor:"black", color:"white", fontWeight:"bold"}}>username</TableCell>
                        <TableCell align="right" style={{backgroundColor:"black", color:"white", fontWeight:"bold"}}>full name</TableCell>
                        <TableCell align="right" style={{backgroundColor:"black", color:"white", fontWeight:"bold"}}>birthday</TableCell>
                        <TableCell align="right" style={{backgroundColor:"black", color:"white", fontWeight:"bold"}}>address</TableCell>
                        <TableCell align="right" style={{backgroundColor:"black", color:"white", fontWeight:"bold"}}>email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.email}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">{row.username}</TableCell>
                            <TableCell align="right">{row.fullname}</TableCell>
                            <TableCell align="right">{row.birthday}</TableCell>
                            <TableCell align="right">{row.address}</TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
} 

