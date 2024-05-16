import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import React from 'react';
import { ConfigTextField, CustomTextFieldProps } from '../models/interfaces/form';

const MultilineWrapper: React.FC<CustomTextFieldProps> = ({name, ...otherProps}) => {

    const [field, mata] = useField(name);

    const configTextField: ConfigTextField = {
        ...field,
        fullWidth: true,
        variant: 'outlined',
        ...otherProps,
    };

    if(mata && mata.touched && mata.error) {
        configTextField.error = true;
        configTextField.helperText = mata.error;
    }

    return (
        <TextField {...configTextField} multiline rows={4}/>
    )

};

export default MultilineWrapper;