import React from 'react';
import { Box, LinearProgress, CircularProgress, Modal, Stack, Typography } from '@mui/material';

interface LottieAnimation {
    isLoading: boolean;
    message?: string;
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    height: "70%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    '&:focus-visible': {
        border: 'none',
    },
};

const LoadingModalWrapper: React.FC<LottieAnimation> = ({ isLoading, message }) => {
    return (
        <Modal open={isLoading} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
            <Box sx={style}>
                <Stack spacing={5}
                    justifyContent="center"
                    alignItems="center"
                    direction="column"
                    height="100%">
                    <CircularProgress />
                    <Typography variant='h6' sx={{ mt: 2 }}>
                        {message}
                    </Typography>
                    <LinearProgress sx={{ width: '80%' }} />
                </Stack>
            </Box>
        </Modal>
    )
};

export default LoadingModalWrapper;