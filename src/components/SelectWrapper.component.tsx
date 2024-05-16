import { TextField, MenuItem } from '@mui/material';
import { ConfigSelect, CustomSelectProps } from '../models/interfaces/form';
import { useField, useFormikContext } from 'formik';
import React, { useEffect } from 'react';

const SelectWrapper: React.FC<CustomSelectProps> = ({ name, options, onChange, value, ...otherProps }) => {
    const formikContext = useFormikContext();
    const { setFieldValue } = formikContext ?? {};
    const [field, meta] = useField(name);
    let effectiveValue;
    if(value){
         effectiveValue = (field.value !== undefined ? field.value : '') || (value !== undefined ? value : '');
    }
    else {
         effectiveValue = (field.value !== undefined ? field.value : '');
    }
    const handleChange = (evt: { target: { value: any } }) => {
        const { value } = evt.target;
        setFieldValue(name, value);
        if (onChange) {
            onChange(value);
        }
    };

    const configSelect: ConfigSelect = {
        ...field,
        select: true,
        variant: 'filled',
        fullWidth: true,
        onChange: handleChange,
        ...otherProps,
    };

    useEffect(() => {
        if (onChange) {
            onChange(field.value);
        }
    }, [field.value]);

    if (meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }

    return (
        <TextField {...configSelect} value={effectiveValue}>
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value }>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default SelectWrapper;
