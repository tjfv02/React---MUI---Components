import { Dialog, DialogContent } from '@mui/material';
import React from 'react';
import { FormDialogCustomProps } from '../models/interfaces/general-components';

const FormDialogWrapper: React.FC<FormDialogCustomProps> = ({ open, handleClose, form }) => {

    return (
        <>
            <Dialog
                open={open}
                onClose={(_event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose();
                    }
                }}
            >
                <DialogContent>
                    {form}
                </DialogContent>
            </Dialog>
        </>
    );

};

export default FormDialogWrapper;