import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import React from 'react';
import { ConfigTextField, CustomTextFieldProps } from '../models/interfaces/form';

const TextFieldWrapper: React.FC<CustomTextFieldProps> = ({name, ...otherProps}) => {

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
        configTextField.helperText = mata.error.startsWith('E') || mata.error.startsWith('l') ? "" : mata.error;
    }

    return (
        <TextField {...configTextField} inputProps={{ maxLength: 150}} />
    )

};

export default TextFieldWrapper;