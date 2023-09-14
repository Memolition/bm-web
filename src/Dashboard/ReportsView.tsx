import React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const ReportsView = () => {
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
                    <Typography variant="h4">Reportes</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ReportsView;