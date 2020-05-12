import axios from 'axios'

// const API_BASE_URL = 'https://elibraryrestapi.herokuapp.com/elibrary/api'
const API_BASE_URL = 'http://192.168.0.147:8080/api'
export const CALL_API = 'CALL_API'
export const HTTP_METHODS = {
    POST: 'POST',
    GET: 'GET'
}

function makeApiCall({ endpoint, method = 'GET', body }) {
    const url = `${API_BASE_URL}${endpoint}`
    const params = {
        url,
        method,
        data: JSON.stringify(body),
        header: {
            'Content-Type': 'application/json'
        }
    }

    return axios(params)
        .then(res => res)
        .catch(error => error)
}

const apiMiddleware = store => next => action => {
    const callApi = action[CALL_API]
    if (typeof callApi === undefined || callApi === undefined) {
        return next(action)
    }

    const [startedType, successType, failureType, isLoading] = callApi.types

    next({ type: startedType, isLoading })

    if (successType == 'LOGIN_SUCCEEDED') {
        return new Promise(
            () => next({
                type: successType,
                payload: { token: 'This is Khanh' }
            })
        )
    }

    return makeApiCall({
        endpoint: callApi.endpoint,
        method: callApi.method,
        body: callApi.body
    }).then(
        res =>{
            console.log(res)
            return next({
                type: successType,
                payload: res.data
            }) },
        error =>{
            console.log(error)
            return next({
                type: failureType,
                payload: error.message
            })
        }
    )
}

export default apiMiddleware;