import axios from 'axios'

const API_BASE_URL = 'http://13.57.212.220:8080/api'
//const API_BASE_URL = 'http://192.168.0.147:8080/api'
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
        data: body,
        header: {
            'Content-Type': 'application/json'
        }
    }

    return axios(params)
}

const apiMiddleware = store => next => action => {
    const callApi = action[CALL_API]
    if (typeof callApi === undefined || callApi === undefined) {
        return next(action)
    }

    const [startedType, successType, failureType, isLoading] = callApi.types

    next({ type: startedType, isLoading })

    return makeApiCall({
        endpoint: callApi.endpoint,
        method: callApi.method,
        body: callApi.body
    }).then(res => {
        console.log('Success:' + res)
        callApi.next?.ok && callApi.next.ok()
        return next({
            type: successType,
            payload: res.data
        })
    }).catch(error => {
        console.log('ERROR:' + error)
        callApi.next?.fail && callApi.next.fail()
        return next({
            type: failureType,
            payload: error.response?.data
        })
    })
}

export default apiMiddleware;