import axios from 'axios';
import API_HOST from './../config';

export function requestBarangayClearance(data) {
    const token = localStorage.getItem('x-access-token');
    return axios({
        url: `${API_HOST}/barangay-clearance`,
        method: 'post',
        headers: {
            'x-access-token': token
        },
        data: data
    });
}