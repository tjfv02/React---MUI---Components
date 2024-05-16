import { CalendarTableProps } from "../models/interfaces/general-components";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { StyledTableCell, StyledTableCellYear, StyledTableRow, StyledTotalRow } from "../components/GridStyles.component";
import React from 'react';
import { months } from "../utils/constants";
import GridTextFieldWrapper from "./GridTextFieldWrapper.component";
import { formatNumber } from "../utils/utilities";
import "../pages/css/monthly.css";

export const CalendarTable: React.FC<CalendarTableProps> = ({ title, type, totalRow, data, handleChangeRightInputMany, handleChangeCellInput, period }) => (
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
                                    <TableCell style={{ background: (index % 2 == 0) ? '#FFF1D3' : '#FFF8EA' }} align='right' key={jndex}><GridTextFieldWrapper rightOnChangeMany={handleChangeRightInputMany} rightOnChange={handleChangeCellInput} index={parseInt(`${index + 1}${jndex}`)} year={type} value={element.Monthly[jndex].Value} /></TableCell>
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