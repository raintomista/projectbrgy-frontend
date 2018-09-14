import axios from 'axios';
import API_HOST from './../config';

export function requestBarangayClearance(data) {
    const token = localStorage.getItem('x-access-token');
    return axios({
        url: `${API_HOST}/barangay-clearance`,
        method: 'post',
        headers: {
            'x-access-token': token
        },
        data: data
    });
}

export function getAllBrgyClearanceRequests(brgyId, page, limit) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/barangay-clearance/requests/admin/${brgyId}?page=${page}&limit=${limit}`, {
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
    return axios.get(`${API_HOST}/business-permit/requests/admin/${brgyId}?page=${page}&limit=${limit}`, {
        headers: {
            'x-access-token': token
        }
    });
}

export function getAllKatarungangPambarangayComplaints(brgyId, page, limit) {
    const token = localStorage.getItem('x-access-token');
    return axios.get(`${API_HOST}/katarungang-pambarangay/requests/admin/${brgyId}`, {
        headers: {
            'x-access-token': token
        }
    });
}