import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import { GridTextFieldProps } from '../models/interfaces/form';
import { formatNumber, numberGET0, toNumber } from '../utils/utilities';
import { ProposalYearPost } from '../models/interfaces/proposal';
import NotificationsWrapper from './NotificationsWrapper.component';
import { AlertOptions } from '../models/interfaces/queries';

const GridTextFieldWrapper: React.FC<GridTextFieldProps> = ({
    leftOnChange,
    rightOnChange,
    rightOnChangeMany,
    decimal,
    numDecimal = 1,
    year,
    index,
    value,
    name,
    item,
    type,
    nonDecimal = false,
}) => {
    const [showInput, setShowInput] = useState<boolean>(false);
    const [valueInput, setValueInput] = useState<string>("");
    const [alertOptions, setAlertOptions] = useState<AlertOptions>({
        open: false,
        autoHideDuration: 3000,
        severity: 'success',
        message: '',
    });
    const inputRef = React.useRef<null | HTMLInputElement>(null);
    const regex = /^-?([0-9]+(\.[0-9]*)?)?$/;
    const integerRegex = /^([0-9]+)?$/;
    const months: number[] = [NaN, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    useEffect(() => {
        if(value != undefined) setValueInput(value.toString().replaceAll(",", ""));
    }, [value])

    const showError = (e: string) => {
        setAlertOptions({
            open: true,
            autoHideDuration: 6000,
            severity: 'error',
            message: e,
        });
    };

    const handleClose = () => {
        setAlertOptions({
            open: false,
            autoHideDuration: 3000,
            severity: 'info',
            message: '',
        });
    };

    const handleFocus = () => {
        setShowInput(true);
    };

    const handleOnBlur = () => {
        setShowInput(false);
        const parsedValue = parseFloat(valueInput);
        let finalValue = Number.isNaN(parsedValue) ? 0 : parsedValue;
        if(leftOnChange && name) {
            if(name == 'Year' && type == 'investment') {
                const total = item?.Projection.filter((e: ProposalYearPost) => e.Value != 0).length;
                if(((total || 0) - 1) > finalValue) {
                    showError("No puedes ingresar un año menos a las proyecciones");
                    finalValue = (total || 0) - 1;
                }
            }
            leftOnChange(index, name, finalValue);
        }
        if(rightOnChange && year != undefined) rightOnChange(index, year, finalValue);
        setValueInput(finalValue.toString());
    };

    const handleOnPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        const newValues = e.clipboardData
            .getData('text')
            .split('\n')[0]
            .split('\t')
            .map((el) => toNumber(el));
        if (rightOnChangeMany && numberGET0(year)) rightOnChangeMany(index, year!, newValues);
        setShowInput(false);
    };

    const handleKeyPressed = (event?: React.KeyboardEvent) => {
        if (event?.key == 'Enter') {
            handleOnBlur();
        }
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = event.target.value;

        if (nonDecimal) {
            if (integerRegex.test(newValue)) {
                if (name === 'Month') {
                    if (!(parseInt(newValue) > 12)) setValueInput(newValue);
                    return;
                }

                if (name === "Year") {
                    if (!(parseInt(newValue) > 20)) setValueInput(newValue);
                    return;
                }
    
                setValueInput(newValue);
            }
            
            return;
        }

        if(regex.test(newValue) && !(name == 'Month' && (!months.includes(parseFloat(newValue))))) setValueInput(newValue);
    }

    React.useEffect(() => {
        if (showInput) {
            inputRef.current?.focus();
        }
    }, [showInput]);

    return (
        <React.Fragment>
            <NotificationsWrapper
                open={alertOptions.open}
                severity={alertOptions.severity}
                message={alertOptions.message}
                autoHideDuration={alertOptions.autoHideDuration}
                onClose={handleClose}
            />
            {showInput ? <TextField 
                type="text"
                label=""
                autoFocus={showInput}
                value={valueInput} 
                onBlur={handleOnBlur} 
                onPaste={(e: React.ClipboardEvent<HTMLDivElement>) => handleOnPaste(e)}
                onChange={handleOnChange} 
                onKeyDown={handleKeyPressed}
            /> : <React.Fragment><p style={{cursor: 'pointer'}} onClick={handleFocus}>{""}{formatNumber(Number.isNaN(parseFloat(valueInput)) ? 0 : parseFloat(valueInput), decimal, numDecimal)}</p></React.Fragment>}
        </React.Fragment>
    );
};

export default GridTextFieldWrapper;
