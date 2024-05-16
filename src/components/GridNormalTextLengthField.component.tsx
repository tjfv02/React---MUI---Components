import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import { GridTextFieldNormalProps } from '../models/interfaces/form';

const GridNormalTextLengthFieldWrapper: React.FC<any> = ({ onChange, accountNumber, value, max }) => {
    const [showInput, setShowInput] = useState<boolean>(false);
    const [valueInput, setValueInput] = useState<string>(value);
    const [showValue, setShowValue] = useState<string>('Escribe aquí');

    useEffect(() => {
        setValueInput(value);
        if (value != '') setShowValue(value);
    }, []);

    const handleFocus = () => {
        setShowInput(true);
    };

    const handleOnBlur = () => {
        setShowInput(false);
        setShowValue(valueInput.length > 0 ? valueInput : 'Escribe aquí');
        onChange(accountNumber, valueInput);
    };

    const handleKeyPressed = (event?: React.KeyboardEvent) => {
        if (event?.key == 'Enter') {
            handleOnBlur();
        }
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setValueInput(newValue);
    };

    return (
        <React.Fragment>
            {showInput ? (
                <TextField
                    // maxLength={maxLength}

                    type="text"
                    label=""
                    autoFocus={showInput}
                    value={valueInput}
                    onBlur={handleOnBlur}
                    onChange={handleOnChange}
                    onKeyDown={handleKeyPressed}
                    inputProps={{ maxLength: max }}
                />
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

export default GridNormalTextLengthFieldWrapper;
