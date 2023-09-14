import React, {useState} from 'react';

import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import AlarmOn from '@mui/icons-material/AlarmOn';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import useApiRequest from '../../hooks/useApiRequest';
import Backdrop from '@mui/material/Backdrop';
import { formatTime } from '../ActiveVehicles';

interface IProps {
    vehicle: any;
    callback: Function;
}

const getTimeDiff = (time:string) => {
    const inDate = new Date(time);
    const now = new Date();

    let diff = now.getTime() - inDate.getTime();
    return Math.round((diff / 1000) / 60);
}

const VehicleListItem = ({vehicle, callback}:IProps) => {
    const [open, setOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const apiRequest = useApiRequest();

    const handleListItemClick = () => {

    };
    
    const handleActionClick = () => {
        if(!!vehicle.entry) {
            //List item is a journal entry
            apiRequest({
                method: 'post',
                path: 'registry/checkout',
                data: {
                    "plate": vehicle.plate
                }
            }).then((r:any) => {
                callback(r.data);
                setDeleted(true);
            });
        } else {
            setOpen(true);
            // List item is a vehicle
            apiRequest({
                method: 'post',
                path: 'registry',
                data: {
                    "carId": vehicle.id
                }
            }).then((r:any) => {
                callback(r);
            });
        }
    };

    return deleted ? null : (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={() => { setOpen(false); }}
            >
                <CircularProgress color="inherit" />                
            </Backdrop>
            <ListItem
                secondaryAction={
                    <IconButton
                        edge="end"
                        aria-label="checkIn"
                        onClick={handleActionClick}
                    >
                        {!vehicle.entry ? <AlarmAddIcon /> : <AlarmOn />}
                    </IconButton>
                }
            >
                <ListItemButton
                    onClick={handleListItemClick}
                >
                    <ListItemText primary={vehicle.plate} secondary={!!vehicle.entry ? (
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {formatTime(getTimeDiff(vehicle.entry.inAt))}
                        </Typography>) : false} />
                </ListItemButton>
            </ListItem>
        </>
    );
};

export default VehicleListItem;