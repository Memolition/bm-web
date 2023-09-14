import React, {useEffect, useState} from 'react';
import axios from 'axios';

import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Backdrop from '@mui/material/Backdrop';

import useApiRequest from '../hooks/useApiRequest';
import { useNavigate } from 'react-router-dom';

interface IProps {
    plate: string;
}

const NewVehicle = ({plate}:IProps) => {
    const navigate = useNavigate();
    const apiRequest = useApiRequest();
    const [categories, setCategories] = useState([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        if(fetching) return;

        setFetching(true);
        apiRequest({method: 'get', path: 'category'}).then((r:any) => {
            setCategories(r?.data ?? []);
            setFetching(false);
        });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        apiRequest({
            method: 'post',
            path: 'car',
            data: {
                plate: data.get('plate'),
                categoryId: data.get('category'),
            }
        }).then((r:any) => {
            apiRequest({
                method: 'post',
                path: 'registry',
                data: {
                    "carId": r.data.id
                }
            }).then((r:any) => {
                setOpen(true);
                navigate(0)
            });
        });
        
    };

  return fetching ? (
    <Grid container spacing={3}>
        <Grid xs={12} padding={3} display="flex" justifyContent="center" alignItems="center">
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </Grid>
    </Grid>
    ) : (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={() => { setOpen(false); }}
            >
                <CircularProgress color="inherit" />                
            </Backdrop>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                        <Grid xs={6}>
                            <FormControl fullWidth>
                                <TextField
                                    autoFocus
                                    required
                                    fullWidth
                                    id="plate"
                                    label="Placa"
                                    name="plate"
                                    defaultValue={plate}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
                                <Select
                                    fullWidth
                                    name="category"
                                >
                                    {
                                        categories.map((category:any, categoryIndex:number) => (
                                            <MenuItem key={`category-item-${categoryIndex}`} value={category.id}>{category.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Guardar
                            </Button>
                        </Grid>
                </Grid>
            </Box>
        </>
  );
}

export default NewVehicle;