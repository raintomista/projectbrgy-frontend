import axios from 'axios';
import API_HOST from './../config';

export function getUserById(id) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/users/${id}`, { headers: { 'x-access-token': token } });
}

export function getUserFollowingList(userId){
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/following/${userId}`, { headers: { 'x-access-token': token } });
}