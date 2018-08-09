import axios from 'axios';
import API_HOST from './../config';

export function comment(postId, message) {
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