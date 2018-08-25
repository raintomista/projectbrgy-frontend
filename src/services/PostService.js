import axios from 'axios';
import API_HOST from './../config';

export function deletePost(postId) {
    const token = localStorage.getItem('x-access-token');
    return axios({
        url: `${API_HOST}/post/${postId}`,
        method: 'delete',
        headers: {
            'x-access-token': token
        }
    });
}

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

export function sharePost(postId) {
    const token = localStorage.getItem('x-access-token');
    return axios({
        url: `${API_HOST}/share/${postId}`,
        method: 'post',
        headers: {
            'x-access-token': token
        }
    });
}

export function unsharePost(postId) {
    const token = localStorage.getItem('x-access-token');
    return axios({
        url: `${API_HOST}/unshare/${postId}`,
        method: 'delete',
        headers: {
            'x-access-token': token
        }
    });
}