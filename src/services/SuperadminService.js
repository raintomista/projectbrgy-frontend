import axios from 'axios';
import API_HOST from './../config';

export function getActivityLogs(page, limit, order) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/logs?page=${page}&limit=${limit}&order=${order}`, {
        headers: {
            'x-access-token': token
        }
    });
}