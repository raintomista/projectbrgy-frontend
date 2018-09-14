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

export function getMyReports() {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/inquiry/my-reports`, {
        headers: {
            'x-access-token': token
        }
    });
}

export function getBrgyMembersReports() {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/inquiry`, {
        headers: {
            'x-access-token': token
        }
    });
}

export function getBrgyMemberReportById(id) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/inquiry/${id}`, {
        headers: {
            'x-access-token': token
        }
    });
}

export function getReportResponses(id, page, limit) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/inquiry/response/${id}?page=${page}&limit=${limit}`, {
        headers: {
            'x-access-token': token
        }
    });
}