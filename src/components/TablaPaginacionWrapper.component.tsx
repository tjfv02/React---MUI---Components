import React, { useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Grid, tableCellClasses, Box, Table, IconButton, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, Stack, TableHead, Button } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight, FirstPage, LastPage, EditOutlined, DeleteOutline } from '@mui/icons-material';
import { ActionsProps, CustomPaginationActionsTableProps, TableActionsProps, TablePaginationActionsProps } from '../models/interfaces/table';
import SearchFieldWrapper from './SearchFieldWrapper.component';
import './css/table.component.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.black,
        fontWeight: 'bold',
        borderBottom: '2px solid #B5DBFF'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
            </IconButton>
        </Box>
    );
}

const TablaPaginacion: React.FC<CustomPaginationActionsTableProps> = ({
    columns,
    rows,
    total,
    page,
    setPage,
    paginationFunction,
    rowsPerPageFunction,
    rowsPerPage = 5,
    rowsPerPageOptions = [5, 10, 25, 50, 100],
    actions,
    firstChild,
    formChild
}) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchValue(event.target.value);
    };

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
        const changeIndex = rowsPerPage * newPage;
        paginationFunction({ init: 0 + changeIndex, fin: rowsPerPage + changeIndex, search: searchValue });
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        rowsPerPageFunction(parseInt(event.target.value, 10));
        setPage(0);
        paginationFunction({ init: 0, fin: parseInt(event.target.value, 10), search: searchValue });
    };

    const handleSearch = (event: React.KeyboardEvent) => {
        if (event.key == 'Enter') {
            setPage(0);
            paginationFunction({ init: 0, fin: rowsPerPage, search: searchValue });
        }
    };

    return (
        <TableContainer>
            <Grid container marginBottom={"4rem"}>
                {firstChild ? <Grid item className="first--child--mainteinance" xs={6}>
                    {firstChild}
                </Grid> : null}
                <Grid item xs={6} className="search--mainteinance">
                    <SearchFieldWrapper placeholder={"Buscar"} handleSearch={handleSearch} handleSearchValue={handleSearchValue} />
                    {formChild ? formChild : null}
                </Grid>
            </Grid>
            <Table sx={{ minWidth: 500 }} size="small" aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        {
                            columns.map((column, index) => (
                                <StyledTableCell key={index} align={column.align}>{column.label}</StyledTableCell>
                            ))
                        }
                        {actions ? (<StyledTableCell align='center'>Acciones</StyledTableCell>) : null}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <StyledTableRow key={index}>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    component="th"
                                    scope="row"
                                    align={column.align}
                                // style={{ width: column.width }}
                                >
                                    {row[column.id]}
                                </TableCell>
                            ))}
                            {actions ? (<TableCell component="th" scope="row" align='center'><TableActions actions={actions} id={row.id} /></TableCell>) : null}
                        </StyledTableRow>
                    ))}

                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={rowsPerPageOptions}
                            colSpan={columns.length}
                            count={total}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            labelRowsPerPage={"Solicitudes por página:"}
                            labelDisplayedRows={({ from, to, count }) => (`${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`)}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'Solicitudes por página:',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

const TableActions: React.FC<ActionsProps> = ({ actions, id }) => {

    return (
        <>
            <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                alignItems="center"
            >
                {actions.map((prop: TableActionsProps, index: number) => (
                    <div key={index}>
                        {prop.id == 'edit' ? <IconButton color="primary" onClick={() => prop.function(id)}><EditOutlined /></IconButton > : null}
                        {prop.id == 'delete' ? <IconButton color="error" onClick={() => prop.function(id)}><DeleteOutline /></IconButton > : null}
                        {prop.id == 'approve' ? <Button sx={{ background: '#429221' }} onClick={() => prop.function(id)}>Aprobar</Button> : null}
                        {prop.id == 'decline' ? <Button sx={{ background: '#DE1C24' }} onClick={() => prop.function(id)}>Rechazar</Button> : null}
                        {prop.id == 'adjust' ? <Button sx={{ background: '#FDBB30' }} onClick={() => prop.function(id)}>Ajustar datos</Button> : null}
                    </div>
                ))}
            </Stack>
        </>
    )
};

export default TablaPaginacion;
