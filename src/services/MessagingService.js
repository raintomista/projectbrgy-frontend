import axios from 'axios';
import API_HOST from './../config';

export function sendMessage(message, receiver_id) {
    const token = localStorage.getItem('x-access-token');
    return axios({
        url: `${API_HOST}/message`,
        method: 'post',
        headers: {
            'x-access-token': token,
        },
        data: {
            message,
            receiver_id
        }
    });
}