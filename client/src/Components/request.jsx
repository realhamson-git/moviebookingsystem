import axios from 'axios';

export const request = axios.create({
    baseURL: `http://localhost:5000/api`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'auth-token': localStorage.getItem('token')  || null
    },
})

export const userRequest = axios.create({
    baseURL: `http://localhost:5000/api/user/`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'auth-token': localStorage.getItem('token')  || null
    },
})

export const adminRequest = axios.create({
    baseURL: `http://localhost:5000/api/admin/`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'auth-token': localStorage.getItem('token')  || null
    },
})
