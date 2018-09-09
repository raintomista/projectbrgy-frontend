import axios from 'axios';
import API_HOST from './../config';

export function createReport(data) {
    const token = localStorage.getItem('x-access-token');
    return axios({
        url: `${API_HOST}/inquiry`,
        method: 'post',
        headers: {
            'x-access-token': token
        },
        data: data
    });
}
