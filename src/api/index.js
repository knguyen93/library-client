import axios from 'axios'

const API_BASE_URL = 'https://elibraryrestapi.herokuapp.com/elibrary/api'
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