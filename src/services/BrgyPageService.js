import axios from 'axios';
import API_HOST from './../config';

export function getBarangayById(id){
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/barangay/${id}`, { headers: { 'x-access-token': token } });
}

export function followBarangay(brgyId) {
    const token = localStorage.getItem('x-access-token');
    return axios({
        url: `${API_HOST}/follow/${brgyId}`,
        method: 'post',
        headers: {
            'x-access-token': token
        }
    });
}

export function unfollowBarangay(brgyId) {
    const token = localStorage.getItem('x-access-token');
    return axios({
        url: `${API_HOST}/unfollow/${brgyId}`,
        method: 'delete',
        headers: {
            'x-access-token': token
        }
    });
}