import axios from 'axios';
import API_HOST from './../config';

export function search(searchQuery, page, limit) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/barangay?search=${searchQuery}&page=${page}&limit=${limit}`, {
        headers: {
            'x-access-token': token
        }
    });
}
