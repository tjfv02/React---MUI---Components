import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import { LoadingCustomProps } from '../models/interfaces/general-components';


const LoadingWrapper: React.FC<LoadingCustomProps> = ({ isLoading }) => {
    return (
        <>
            <Backdrop sx={{ color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
};

export default LoadingWrapper;