import axios from 'axios';
import API_HOST from './../config';

export function getUserById(id) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/users/${id}`, {
        headers: {
            'x-access-token': token
        }
    });
}

export function getUserFollowingList(userId, page, limit, order) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/following/users/${userId}?page=${page}&limit=${limit}&order=${order}`, {
        headers: {
            'x-access-token': token
        }
    });
}

export function getUserSharedPosts(userId, page, limit, order) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/shared/post/member/${userId}?page=${page}&limit=${limit}&order=${order}`, {
        headers: {
            'x-access-token': token
        }
    });
}