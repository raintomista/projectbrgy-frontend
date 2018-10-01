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

export function getUserById(id) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/users/${id}`, {
        headers: {
            'x-access-token': token
        }
    });
}

export function getMessagesById(id, page, limit, order, skip) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/message/${id}?page=${page}&limit=${limit}&order=${order}&skip=${skip}`, {
        headers: {
            'x-access-token': token
        }
    });
}