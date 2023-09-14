import React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import ActiveVehicles from './ActiveVehicles';
import CheckInForm from './CheckInForm';

const JournalRegistry = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Paper
                    sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    }}
                >
                    <CheckInForm />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper
                    sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    }}
                >
                    <Typography variant="h5">
                        Vehiculos pendientes
                    </Typography>
                    <ActiveVehicles />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default JournalRegistry;