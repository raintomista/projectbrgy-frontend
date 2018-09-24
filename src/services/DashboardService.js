import axios from 'axios';
import API_HOST from './../config';

export function getUserDetailsViaToken() {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/me`, { headers: { 'x-access-token': token } });
}

export function getPostsFromFollowing(page, limit) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/newsfeed?page=${page}&limit=${limit}`, {
        headers: { 'x-access-token': token }
    });
}

export function postAnnouncement(data) {
    const token = localStorage.getItem('x-access-token');
    return axios({
        url: `${API_HOST}/post`,
        method: 'post',
        headers: {
            'x-access-token': token
        },
        data: data
    });
}