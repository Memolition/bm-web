import React, {useState, useCallback, useEffect} from 'react';
import throttle from "lodash.throttle";
import axios from 'axios';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import useToken from '../hooks/useToken';
import VehicleList from './VehicleList';
import NewVehicle from './NewVehicle';
import useApiRequest from '../hooks/useApiRequest';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const CheckInForm = () => {
    const [query, setQuery] = useState("");
    const [vehicles, setVehicles] = useState([]);
    const [newVehicle, setNewVehicle] = useState(false);
    const [fetching, setFetching] = useState<boolean>(false);
    const apiRequest = useApiRequest();
    const navigate = useNavigate();

    const changeHandler = (event:any) => {
        const queryValue = event.target.value;

        if(!!queryValue?.length) {
            setFetching(true);
        }

        setQuery(queryValue);
    };

    const throttledFetch = useCallback(throttle((q:string) => {
        if(!!q?.length && !fetching) {
            apiRequest({method: 'get', path: `search/${q}`}).then(r => {
                setVehicles(r?.data);
                setFetching(false);
            }).catch((e:any) => {
                console.log(e);
            });
        }
    }, 1000), []);

    useEffect(() => {
        throttledFetch(query);
    }, [query]);

    return (
        <Grid spacing={2}>
            <Grid xs={12}>
                <TextField
                    fullWidth
                    label="Buscar o Registrar Vehiculo"
                    value={query}
                    onChange={changeHandler}
                    autoFocus={true}
                />
            </Grid>
            {
                fetching && (
                    <Grid container spacing={3}>
                        <Grid xs={12} padding={3} display="flex" justifyContent="center" alignItems="center">
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        </Grid>
                    </Grid>
                )
            }
            { !!vehicles?.length && !fetching && (
                <Grid xs={12}>
                    <VehicleList vehicles={vehicles} callback={(data:any)=>{navigate(0)}}/>
                </Grid>
                )
            }
            { !vehicles?.length && !!query?.length && !fetching && (
                <>
                    <Grid xs={12} padding={2}>
                        <Typography>
                            No se encontro el vehiculo con el No. de Placa ingresado.
                        </Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Button fullWidth variant="outlined" onClick={() => {setNewVehicle(!newVehicle)}}>
                            { newVehicle ? 'Cancelar' : 'Registrar como nuevo vehiculo' }
                        </Button>
                    </Grid>
                </>
            )}
            {
                newVehicle && <NewVehicle plate={query} />
            }
        </Grid>
    );
}

export default CheckInForm;