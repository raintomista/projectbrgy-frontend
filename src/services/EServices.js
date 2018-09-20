import axios from 'axios';
import API_HOST from './../config';

export function requestBarangayClearance(form, data) {
    const token = localStorage.getItem('x-access-token');
    return axios({
        url: `${API_HOST}/barangay-clearance`,
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

export function requestBusinessPermit(form, data) {
    const token = localStorage.getItem('x-access-token');
    return axios({
        url: `${API_HOST}/business-permit`,
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
export function requestKatarungan(data) {
    const token = localStorage.getItem('x-access-token');
    return axios({
        url: `${API_HOST}/katarungang-pambarangay`,
        method: 'post',
        headers: {
            'x-access-token': token
        },
        data: data
    });
}

export function getAllBrgyClearanceRequests(brgyId, page, limit) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/barangay-clearance/requests/admin/${brgyId}?page=${page}&limit=${limit}&order=desc`, {
        headers: {
            'x-access-token': token
        }
    });
}
export function getBrgyClearanceRequestById(brgyId) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/barangay-clearance/${brgyId}`, {
        headers: {
            'x-access-token': token
        }
    });
}

export function getAllBusinessClearanceRequests(brgyId, page, limit) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/business-permit/requests/admin/${brgyId}?page=${page}&limit=${limit}&order=desc`, {
        headers: {
            'x-access-token': token
        }
    });
}

export function getAllKatarungangPambarangayComplaints(brgyId, page, limit, order) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/katarungang-pambarangay/requests/admin/${brgyId}?page=${page}&limit=${limit}&order=${order}`, {
        headers: {
            'x-access-token': token
        }
    });
}