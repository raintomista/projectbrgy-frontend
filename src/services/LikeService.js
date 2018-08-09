import axios from 'axios';
import API_HOST from './../config';

export function likePost(postId) {
    const token = localStorage.getItem('x-access-token');
    return axios({
        url: `${API_HOST}/like/${postId}`,
        method: 'post',
        headers: {
            'x-access-token': token
        }
    });
}

export function unlikePost(postId) {
    const token = localStorage.getItem('x-access-token');
    return axios({
        url: `${API_HOST}/unlike/${postId}`,
        method: 'delete',
        headers: {
            'x-access-token': token
        }
    });
}