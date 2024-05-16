import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ConfigDatePicker, CustomTextFieldProps } from '../models/interfaces/form';
import { useField, useFormikContext } from 'formik';

const MonthYearPickerWrapper: React.FC<CustomTextFieldProps> = ({ name, ...otherProps }) => {
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
            inputFormat="MM/yyyy"
            value={field.value ?? null}
            views={['month', 'year']}
            onChange={(val) => setFieldValue(name, val)}
            renderInput={(params) => <TextField  {...params} {...configDatePicker} />}
        />
    );
};

export default MonthYearPickerWrapper;
