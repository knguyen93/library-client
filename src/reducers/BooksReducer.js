import { ACTIONS } from '../actions/bookActions'

const initState = {
    records: [],
    isLoading: true
}

export default function books(state = initState, action) {
    const { payload, type } = action
    switch (type) {
        case ACTIONS.FETCH_BOOKS:
            return {
                ...state
            }
        case ACTIONS.FETCH_BOOKS_SUCCEEDED:
            return {
                records: payload.data
            }

        case ACTIONS.FETCH_BOOKS_FAILED:
            return {
                ...state,
                error: payload
            }

            case ACTIONS.FILTER_BOOK_SUCCEEDED:
                return {
                    records: payload.data
                }

        case ACTIONS.ADD_NEW_BOOK_SUCCEEDED:
            return {
                ...state,
                records: state.records.concat(action.payload)
            }
        default:
            return state
    }
}