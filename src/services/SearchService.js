import axios from 'axios';
import API_HOST from './../config';

export function search(searchQuery) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/barangay?search=${searchQuery}`, {
        headers: {
            'x-access-token': token
        }
    });
}
