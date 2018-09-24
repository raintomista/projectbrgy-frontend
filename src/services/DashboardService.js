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

export function postAnnouncement(form, data) {
    const token = localStorage.getItem('x-access-token');
    return axios({
        url: `${API_HOST}/post`,
        method: 'post',
        headers: {
            'x-access-token': token,
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
            form.$('uploadProgress').set('value', Math.round((progressEvent.loaded * 100) / progressEvent.total) * 0.65); //Update upload progress
        },
        onDownloadProgress: progressEvent => {
            form.$('uploadProgress').set('value', 100); //Set upload progress to 100;
        },
        data: data
    });
}