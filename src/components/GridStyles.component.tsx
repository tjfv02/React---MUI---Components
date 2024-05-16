import { TableCell, TableRow, styled, tableCellClasses } from "@mui/material";
import { StyledMainTableCellProps } from "../models/interfaces/table";

export const StyledTableCellYear = styled(TableCell)(({ theme }) => ({
    minWidth: '150px',
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#CDE7FF',
        color: theme.palette.common.black,
        fontWeight: 'bold',
        borderBottom: '2px solid #B5DBFF',
        fontSize: '1rem'
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.black,
        fontWeight: 'bold',
        borderBottom: '2px solid #B5DBFF',
        fontSize: 14
    },
}));

export const StyledMainTableCell1 = styled(TableCell)<StyledMainTableCellProps>(({ theme, bord }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#CDE7FF',
        color: theme.palette.common.black,
        fontWeight: 'bold',
        borderBottom: bord
    }
}));


export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#CDE7FF',
        color: theme.palette.common.black,
        fontWeight: 'bold',
        borderBottom: '2px solid #B5DBFF',
        fontSize: '1rem'
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.black,
        fontWeight: 'bold',
        borderBottom: '2px solid #B5DBFF',
        fontSize: 14,
    },
}));

export const StyledMainTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#CDE7FF',
        color: theme.palette.common.black,
        fontWeight: 'bold'
    }
}));


export const StyledTableTotalCell = styled(TableCell)(({ theme }) => {

    return {
        [`&.${tableCellClasses.head}`]: {
            color: theme.palette.common.black
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14   
        }
    }
});

export const StyledTotalRow = styled(TableRow)(({ theme }) => ({
    '&': {
        backgroundColor: '#EAF5FF',
        color: theme.palette.common.black,
        borderTop: '2px solid #B5DBFF'
    },
    '& td': {
        fontWeight: 'bold',
        fontSize: 14,
        backgroundColor: '#E5F3FF',
    }
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:nth-of-type(odd) .stiky': {
        backgroundColor: '#f2f3f5',
        zIndex: '100'
    },
    '&:nth-of-type(even) .stiky': {
        backgroundColor: 'white',
        zIndex: '100'
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));