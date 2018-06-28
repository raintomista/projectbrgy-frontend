import axios from 'axios';
import API_HOST from './../config';

export function getRegions() {
    return axios.post(`${API_HOST}/barangay/regions`);
}

export function getProvinces(region) {
    return axios.post(`${API_HOST}/barangay/provinces`, { region });
}

export function getMunicipalities(region, province) {
    return axios.post(`${API_HOST}/barangay/municipalities`, { region, province });
}

export function getBarangays(region, province, municipality) {
    return axios.post(`${API_HOST}/barangay/barangays`, { region, province, municipality });
}

export function getBarangayDetails(region, province, municipality, name) {
    return axios.post(`${API_HOST}/barangay/detail`, { region, province, municipality, name });
}

export function createUser(user) {
    return axios.post(`${API_HOST}/users`, user);
}

export function loginUser(email, password) {
    return axios.post(`${API_HOST}/auth/sign-in`, { email, password });
}
