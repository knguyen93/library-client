import axios from 'axios'

// const API_BASE_URL = 'https://elibraryrestapi.herokuapp.com/elibrary/api'
const API_BASE_URL = 'http://13.57.212.220:8080/api'

const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export function fetchBooks() {
    return client.get('/book/list')
}

export function fetchMembers() {
    return client.get('/member/list')
}

export function login(params) {
    return client.post('/member/login', params)
}