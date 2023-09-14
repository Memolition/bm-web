import axios from 'axios';
import useToken from './useToken';

export const APIUrl = 'http://blue-medical.lan/api';

interface IProps {
    method: string;
    path: string;
    query?: string[];
    data?: any;
}

const useApiRequest = () => {
    const token = useToken();

    return ({method, path, query, data}:IProps) => {
        const queryArgs = !!query?.length ? '?' + query.join('&&') : '';

        return axios({
            method,
            url: `${APIUrl}/${path}${queryArgs}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data,
        });
    }
}

export default useApiRequest;