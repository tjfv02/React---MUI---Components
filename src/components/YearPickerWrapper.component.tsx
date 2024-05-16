import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ConfigDatePicker, CustomYearPickerProps } from '../models/interfaces/form';
import { useField, useFormikContext } from 'formik';
import moment from 'moment';


const YearPickerWrapper: React.FC<CustomYearPickerProps> = ({ name, minYear, ...otherProps }) => {
    const minDate = moment().year(minYear);

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
            minDate={minDate}
            views={['year']}
            value={field.value ?? null}
            onChange={(val) => setFieldValue(name, val)}
            renderInput={(params) => <TextField  {...params} {...configDatePicker} />}
        />
    );
};

export default YearPickerWrapper;
