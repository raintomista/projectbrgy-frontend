import axios from 'axios';
import API_HOST from './../config';

export function getRegions(generate) {
    return axios.post(`${API_HOST}/barangay/regions?generate=${generate}`);
}

export function getProvinces(region, generate) {
    return axios.post(`${API_HOST}/barangay/provinces?generate=${generate}`, {
        region
    });
}

export function getMunicipalities(region, province, generate) {
    return axios.post(`${API_HOST}/barangay/municipalities?generate=${generate}`, {
        region,
        province
    });
}

export function getBarangayById(id) {
    return axios.get(`${API_HOST}/barangay/${id}`);
}

export function getBarangays(region, province, municipality, generate) {
    return axios.post(`${API_HOST}/barangay/barangays?generate=${generate}`, {
        region,
        province,
        municipality
    });
}

export function getBarangayDetails(region, province, municipality, name) {
    return axios.post(`${API_HOST}/barangay/detail`, {
        region,
        province,
        municipality,
        name
    });
}

export function getUser(token) {
    return axios.get(`${API_HOST}/me`, {
        headers: {
            'x-access-token': token
        }
    });
}


export function auth(token) {
    return axios.get(`${API_HOST}/auth/verify-user-registration/${token}`);
}

export function createUser(user) {
    return axios.post(`${API_HOST}/users`, user);
}

export function loginUser(email, password) {
    return axios({
        url: `${API_HOST}/auth/sign-in`,
        method: 'post',
        data: {
            email,
            password
        }
    });
}

export function signOutUser() {
    const token = localStorage.getItem('x-access-token');
    return axios({
        url: `${API_HOST}/auth/sign-out`,
        method: 'post',
        headers: {
            'x-access-token': token
        }
    });
}

export function forgotPassword(email) {
    return axios({
        url: `${API_HOST}/auth/forgot-password`,
        method: 'post',
        data: {
            email
        }
    });
}

export function resetPassword(verify_code, new_password) {
    return axios({
        url: `${API_HOST}/auth/update-password`,
        method: 'post',
        data: {
            verify_code,
            new_password
        }
    });
}