import { CalendarTable1Props } from "../models/interfaces/general-components";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { StyledTableCell, StyledTableCellYear, StyledTableRow, StyledTotalRow } from "../components/GridStyles.component";
import React from 'react';
import "../pages/css/yearly.css";
import { formatNumber } from "../utils/utilities";

export const Calendar1Table: React.FC<CalendarTable1Props> = ({ title, data, period }) => (
    <div style={{ marginTop: '3%' }}>
        <Typography variant='subtitle1' gutterBottom>
            <strong>{title}</strong>
        </Typography>
        <div className='tables-container'>
            <Table sx={{ minWidth: 500 }} size='small' className="custom-table">
                <TableHead>
                    <TableRow className="header-row">
                        <StyledTableCell className='stiky right-border' align='left'>
                            Concepto
                        </StyledTableCell>
                        <StyledTableCell className='stiky' align='left'>
                            Q1
                        </StyledTableCell>
                        <StyledTableCell className='stiky' align='left'>
                            Q2
                        </StyledTableCell>
                        <StyledTableCell className='stiky' align='left'>
                            Q3
                        </StyledTableCell>
                        <StyledTableCell className='stiky' align='left'>
                            Q4
                        </StyledTableCell>
                        {[...Array(5)].map((_, index) => (
                            <StyledTableCellYear style={{background: '#FFE3A8', borderBottom: '2px solid #FFD272'}} key={index} align='center'>
                                {period + index}
                            </StyledTableCellYear>
                        ))}
                        <StyledTableCellYear style={{background: '#FFE3A8', borderBottom: '2px solid #FFD272'}} align='center'>
                            {">"} {period + 4}
                        </StyledTableCellYear>
                        <StyledTableCellYear style={{background: '#FFE3A8', borderBottom: '2px solid #FFD272'}} className="left-border" align='center'>Total</StyledTableCellYear>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((element, index) => (
                        <React.Fragment key={index}>
                            {element.AccountName == 'Total' ? 
                                <StyledTotalRow style={{ height: "42px" }}>
                                    <TableCell className="stiky right-border">
                                        {element.AccountName}
                                    </TableCell>
                                    {[...Array(10)].map((_month, jndex) => (
                                        <TableCell align='right' key={jndex}>{formatNumber(parseFloat(element.Projection[jndex].Value), true, 2)}</TableCell>
                                    ))}
                                    <TableCell className="left-border" align='right'>{formatNumber(parseFloat(element.Total), true, 2)}</TableCell>
                                </StyledTotalRow> 
                            : <StyledTableRow style={{ height: "42px" }}>
                                <TableCell className="stiky right-border">
                                    {element.AccountName}
                                </TableCell>
                                {[...Array(10)].map((_month, jndex) => (
                                    <TableCell align='right' key={jndex}>{formatNumber(parseFloat(element.Projection[jndex].Value), true, 2)}</TableCell>
                                ))}
                                <TableCell className="left-border" align='right'>{formatNumber(parseFloat(element.Total), true, 2)}</TableCell>
                            </StyledTableRow>} 
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>
);