import React from 'react';
import { FormControl, FormControlLabel, FormGroup, Checkbox, FormLabel } from '@mui/material';
import { CustomCheckBoxProps } from '../models/interfaces/form';
import { useField, useFormikContext } from 'formik';

const CheckBoxWrapper: React.FC<CustomCheckBoxProps> = ({name, label, legend, ...otherProps}) => {

    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = (evt: { target: { checked: any; }; }) => {
        const { checked } = evt.target;
        setFieldValue(name, checked);
    }

    const configCheckbox = {
        ...field,
        onChange: handleChange,
        ...otherProps
    };

    const configFormControl = {
        error: false
    };
    if(meta && meta.touched && meta.error) configFormControl.error = true;

    return (
        <FormControl {...configFormControl}>
            <FormLabel component="legend">{legend}</FormLabel>
            <FormGroup>
                <FormControlLabel label={label} control={<Checkbox {...configCheckbox}/>}></FormControlLabel>
            </FormGroup>
        </FormControl>
    );

};

export default CheckBoxWrapper;