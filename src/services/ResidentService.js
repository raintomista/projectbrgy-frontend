import axios from 'axios';
import API_HOST from './../config';

export function getMyResidents(brgyId) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/barangay/${brgyId}/residents`, {
        headers: {
            'x-access-token': token
        }
    });
}
