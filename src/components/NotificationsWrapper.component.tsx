import { Snackbar, Alert } from '@mui/material';
import React from 'react';
import { AlertOptions } from '../models/interfaces/queries';

const NotificationsWrapper: React.FC<AlertOptions> = ({open, severity, message, autoHideDuration, onClose}) => {
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <Alert severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationsWrapper;