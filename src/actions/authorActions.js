import {CALL_API} from '../middleware/api'

export const ACTIONS = {
    FETCH_AUTHOR: 'FETCH_AUTHOR',
    FETCH_AUTHOR_SUCCEEDED: 'FETCH_AUTHOR_SUCCEEDED',
    FETCH_AUTHOR_FAILED: 'FETCH_AUTHOR_FAILED'
}

export function fetchAuthors() {
    return {
        [CALL_API]: {
            types: [ACTIONS.FETCH_AUTHOR, ACTIONS.FETCH_AUTHOR_SUCCEEDED, ACTIONS.FETCH_AUTHOR_FAILED],
            endpoint: '/author/list',
            method: HTTP_METHODS.GET,
        }
    }
}