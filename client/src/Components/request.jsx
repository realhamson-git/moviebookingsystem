import axios from 'axios';

// const URL = "http://localhost:5000/api"
const URL = "http://3.110.159.145:5000/api/"

export const request = axios.create({
    baseURL: URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'auth-token': localStorage.getItem('token')  || null
    },
})

export const userRequest = axios.create({
    baseURL: `${ URL }/user/`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'auth-token': localStorage.getItem('token')  || null
    },
})

export const adminRequest = axios.create({
    baseURL: `${ URL }/admin/`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'auth-token': localStorage.getItem('token')  || null
    },
})
