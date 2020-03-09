import axios from 'axios';
const API_BASE_URL = 'http://localhost:5000';

const client = axios.create({
    baseURL : API_BASE_URL,
    headers : {
        'Content-Type' : 'application/json'
    },
});


export function signUp(params){
    return client.post('/employees',params);
}

export function login(params){
    return client.post('/employees/login',params);
}

export function accountActivation(params){
    return client.post('/account-activation',params);
}

export function verifyToken(params){
    return client.post('/employees/verifyToken',params);
}

export function fetchProjects(){
    return client.get('/projects?_embed=tasks');
}
