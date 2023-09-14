import React from 'react';

import List from '@mui/material/List';
import VehicleListItem from './VehicleListItem';

interface IProps {
    vehicles: any[];
    callback: Function;
}

const VehicleList = ({vehicles, callback}:IProps) => {
    return (
        <List>
            {
                vehicles.map((vehicle:any, vehicleIndex:number) => (
                    <VehicleListItem key={`vehicle-list-item-${vehicleIndex}`} vehicle={vehicle} callback={callback} />
                ))
            }
        </List>
    );
};

export default VehicleList;