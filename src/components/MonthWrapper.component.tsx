import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ConfigDatePicker, CustommMonthFieldProps } from '../models/interfaces/form';
import { useField, useFormikContext } from 'formik';

const MonthPickerWrapper: React.FC<CustommMonthFieldProps> = ({ name, views, label, disabled }) => {
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();

    const configDatePicker: ConfigDatePicker = {
        ...field,
        type: 'date',
        variant: 'outlined',
        fullWidth: true,
        InputLabelProps: {
            shrink: true,
        }
    };

    if (meta && meta.touched && meta.error) {
        configDatePicker.error = true;
        configDatePicker.helperText = meta.error.startsWith('L') || meta.error.startsWith('a') ? "" : meta.error;
    }

    return (
        <DatePicker
            views={views}
            value={field.value ?? null}
            openTo="month"
            onChange={(val) => setFieldValue(name, val)}
            inputFormat="MM/yyyy"
            disabled={disabled}
            renderInput={(params) => <TextField name={name} label={label} {...configDatePicker} {...params} />}
        />
    );
};

export default MonthPickerWrapper;
