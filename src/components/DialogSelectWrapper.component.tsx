import React from 'react';
import { Box, Button, Dialog, DialogActions, TextField, MenuItem, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Stack, Typography } from "@mui/material";
import { CustomDialogSelectProps } from '../models/interfaces/form';

const DialogSelectWrapper: React.FC<CustomDialogSelectProps> = ({isOpen, onClose, onDownload, titleDialog, optionSelect, nameSelect, onChangeSelect, valueSelect}) => {
    return (
        <>
            <Dialog
                open={isOpen}
                onClose={(_event, reason) => {
                    if (reason !== 'backdropClick') {

                    }
                }}
                fullWidth={true}
                maxWidth={'xs'}
            >
                <DialogTitle>{titleDialog}</DialogTitle>

                <Stack padding={2}>
                    <TextField
                        select
                        type="text"
                        label=""
                        name={nameSelect}
                        value={valueSelect}
                        onChange={(e) => {onChangeSelect(e.target.value)}}
                        fullWidth
                    >
                        {optionSelect.map((el) => (
                            <MenuItem key={el.value} value={el.value}>
                                {el.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
                <DialogActions>
                    <Button variant='text' onClick={() => { onClose(false)}}>
                        <Typography fontWeight={"bold"} fontSize="18px" color="text.primary" mb={2}>
                            Cancelar
                        </Typography>
                    </Button>
                    <Button variant='text' onClick={onDownload}>
                        <Typography fontWeight={"bold"} fontSize="18px" color="#1A75CF" mb={2}>
                            Exportar
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default DialogSelectWrapper;