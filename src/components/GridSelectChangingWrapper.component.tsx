/* eslint-disable @typescript-eslint/no-unused-vars */
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import { GridSelectFieldProps } from '../models/interfaces/form';
import { MenuItem } from '@mui/material';

const GridSelectChangingWrapper: React.FC<GridSelectFieldProps> = ({
    accountNumber,
    options,
    onChange,
    type,
    value,
}) => {
    const [showInput, setShowInput] = useState<boolean>(false);
    const [valueInput, setValueInput] = useState<string>(value);
    const [showValue, setShowValue] = useState<string>('Seleccione una opción');

    useEffect(() => {
        // console.log('value: ', value);
        if (value != '' && options.length > 0) {
            const valueSelected = options.find((e) => e.value == value);
            if (valueSelected) {
                setShowValue(valueSelected.label);
                setValueInput(valueSelected.value);
                onChange(accountNumber, valueSelected.value, valueSelected.label, valueSelected.year);
            }
        } else {
            setShowInput(false);
        }
    }, [options]);

    const handleFocus = () => {
        setShowInput(true);
    };

    const handleClick = () => {
        setShowInput(false);
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        setShowInput(false);
        setValueInput(event.target.value);
        const valueSelected = options.find((e) => e.value == event.target.value);
        setShowValue(valueSelected.label);
        if (type == 0) onChange(accountNumber, valueSelected.value, valueSelected.label, valueSelected.year);
        else if (type == 1) onChange(accountNumber, event.target.value);
    };

    return (
        <React.Fragment>
            {showInput ? (
                <TextField
                    type="text"
                    label=""
                    fullWidth
                    select
                    value={valueInput}
                    onChange={(e) => handleOnChange(e)}
                    onClick={() => handleClick()}
                >
                    {value && showValue != 'Seleccione una opción' && (
                        <MenuItem key={valueInput} value={valueInput}>
                            {showValue}
                        </MenuItem>
                    )}
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            ) : (
                <React.Fragment>
                    <p style={{ cursor: 'pointer' }} onClick={handleFocus}>
                        {showValue}
                    </p>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default GridSelectChangingWrapper;
