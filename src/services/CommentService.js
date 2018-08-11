import axios from 'axios';
import API_HOST from './../config';

export function addComment(postId, message) {
    const token = localStorage.getItem('x-access-token');
    return axios({
        url: `${API_HOST}/comment`,
        method: 'post',
        headers: {
            'x-access-token': token
        },
        data: {
            post_id: postId,
            message: message
        }
    });
}

export function deleteComment(commentId) {
    const token = localStorage.getItem('x-access-token');
    return axios({
        url: `${API_HOST}/comment/${commentId}`,
        method: 'delete',
        headers: {
            'x-access-token': token
        }
    });
}


export function getCommentsByPostId(postId, page, limit) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/comment/${postId}?page=${page}&limit=${limit}`, {
        headers: {
            'x-access-token': token
        }
    });
}