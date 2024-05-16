import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ConfigDatePicker, CustomTextFieldProps } from '../models/interfaces/form';
import { useField, useFormikContext } from 'formik';

const DatePickerWrapper: React.FC<CustomTextFieldProps> = ({ name, ...otherProps }) => {
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();

    const configDatePicker: ConfigDatePicker = {
        ...field,
        type: 'date',
        variant: 'outlined',
        fullWidth: true,
        InputLabelProps: {
            shrink: true,
        },
        ...otherProps,
    };

    if (meta && meta.touched && meta.error) {
        configDatePicker.error = true;
        configDatePicker.helperText = meta.error;
    }

    return (
        <DatePicker
            value={field.value ?? null}
            onChange={(val) => setFieldValue(name, val)}
            inputFormat="DD/MM/yyyy"
            renderInput={() => <TextField name={name} {...configDatePicker} />}
        />
    );
};

export default DatePickerWrapper;
