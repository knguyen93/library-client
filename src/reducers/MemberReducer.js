import { ACTIONS } from '../actions/memberActions'

const initState = {
    records: []
}

export default function membbers(state = initState, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_MEMBERS_SUCCEEDED:
            return {
                records: payload.data
            }

        case ACTIONS.FILTER_MEMBER_SUCCEEDED:
            return {
                records: payload.data
            }

            case ACTIONS.FETCH_MEMBERS_FAILED:
                return {
                    ...state,
                    error: payload
                }

        case ACTIONS.LOGIN_FAILED:
            return {
                ...state,
                error: payload && payload.error
            }

            case ACTIONS.CHECKOUT_SUCCEEDED:
                return {
                    ...state,
                }

        default:
            return state
    }
}