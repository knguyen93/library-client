import { ACTIONS } from '../actions/memberActions'

let count = 1;
function uniqueId() {
    return count++;
}

const initState = {
    records: []
}

export default function membbers(state = initState, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_MEMBERS_SUCCEEDED:
            return {
                records: payload
            }

        case ACTIONS.FETCH_MEMBERS_FAILED:
            return {
                ...state,
                error: payload.error
            }

        case ACTIONS.LOGIN_FAILED:
            return {
                ...state,
                error: payload && payload.error
            }

        default:
            return state
    }
}