import React, {useEffect, useState} from 'react';

import Backdrop from '@mui/material/Backdrop';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import CircularProgress from '@mui/material/CircularProgress';

import useApiRequest from '../hooks/useApiRequest';
import VehicleList from './VehicleList';

export const formatTime = (time:number) => {
    const minutes = time % 60;
    const hours = Math.floor(time / 60);

    const hoursStr = hours > 0 ? `${hours}hr${hours > 1 ? 's' : ''} ` : '';
    return `${hoursStr}${minutes}min`;
}

const ActiveVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [data, setData] = useState<any|null>(null);
    const [fetching, setFetching] = useState<boolean>(true);
    const apiRequest = useApiRequest();


    useEffect(() => {
        apiRequest({
            method: 'get',
            path: 'pending'
        }).then((r:any) => {
            const newVehicles = r?.data?.map((vehicle:any) => {
                const {car, ...entry} = vehicle;

                return {
                    ...car[0],
                    entry
                };
            }) ?? [];
            
            setVehicles(newVehicles);
            setFetching(false);
        });
    }, []);

    return fetching ? (
        <Grid container spacing={3}>
            <Grid xs={12} padding={3} display="flex" justifyContent="center" alignItems="center">
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </Grid>
        </Grid>
        ) : (<>
        <VehicleList vehicles={vehicles} callback={(data:any) => {console.log('entry',data); setData(data);}} />

        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={!!data}
            onClick={() => { setData(null); }}
        >
            { data && (
                <TableContainer component={Paper} sx={{ width: 1/2 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell>Fecha y Hora de Entrada</TableCell>
                                <TableCell align="right">{data.entry.inAt}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Fecha y Hora de salida</TableCell>
                                <TableCell align="right">{data.entry.outAt}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Tiempo</TableCell>
                                <TableCell align="right">{formatTime(data.timeIn)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Importe</TableCell>
                                <TableCell align="right">Q. {data.totalCharges}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Backdrop>
    </>);

};

export default ActiveVehicles;