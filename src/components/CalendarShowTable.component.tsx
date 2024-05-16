import { CalendarShowTableProps } from "../models/interfaces/general-components";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { StyledTableCell, StyledTableCellYear, StyledTableRow, StyledTotalRow } from "../components/GridStyles.component";
import React from 'react';
import { months } from "../utils/constants";
import { formatNumber } from "../utils/utilities";
import "../pages/css/monthly.css";

export const CalendarShowTable: React.FC<CalendarShowTableProps> = ({ title, totalRow, data, period }) => (
    <div style={{ marginTop: '3%' }}>
        <Typography variant='subtitle1' gutterBottom>
            <strong>{title} {period}</strong>
        </Typography>
        <div className='tables-container'>
            <Table sx={{ minWidth: 500 }} size='small' className="custom-table">
                <TableHead>
                    <TableRow className="header-row">
                        <StyledTableCell className='stiky right-border' align='left'>
                            Concepto
                        </StyledTableCell>
                        {months.map((month, index) => (
                            <StyledTableCellYear key={index} align='center'>
                                {month}
                            </StyledTableCellYear>
                        ))}
                        <StyledTableCellYear align='center'>Total</StyledTableCellYear>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((element, index) => (
                        <React.Fragment key={index}>
                            <StyledTableRow>
                                <TableCell className="stiky right-border">
                                    {element.AccountName}
                                </TableCell>
                                {months.map((_month, jndex) => (
                                    <TableCell align='right' key={jndex}>
                                        {formatNumber(Number.isNaN(parseFloat(`${element.Monthly[jndex].Value}`)) ? 0 : parseFloat(`${element.Monthly[jndex].Value}`), false, 1)}
                                    </TableCell>
                                ))}
                                <TableCell align='right'>{formatNumber(element.Total)}</TableCell>
                            </StyledTableRow>
                        </React.Fragment>
                    ))}
                    <StyledTotalRow style={{ height: "42px" }}>
                        <TableCell className="stiky right-border">
                            Total
                        </TableCell>
                        {months.map((_month, jndex) => (
                            <TableCell align='right' key={jndex}>{formatNumber(totalRow.length > 0 ? totalRow[jndex] : 0)}</TableCell>
                        ))}
                        <TableCell align='right'>{formatNumber(totalRow.length > 0 ? totalRow[totalRow.length - 1] : 0)}</TableCell>
                    </StyledTotalRow>
                </TableBody>
            </Table>
        </div>
    </div>
);