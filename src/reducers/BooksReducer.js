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
                records: payload && payload.data,
                succeed: payload && payload.success,
                messages: payload && (payload.messages || [payload.message])
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
        // add book
        case ACTIONS.ADD_NEW_BOOK_SUCCEEDED:
            return {
                ...state,
                records: state.records.concat(action.payload),
                newBookResult: payload
            }

        case ACTIONS.ADD_NEW_BOOK_FAILED:
            return {
                ...state,
                newBookErrors: payload.errors
            }
        // get authors
        case ACTIONS.FETCH_AUTHORS_SUCCEEDED:
            return {
                ...state,
                authors: payload.data
            }

        case ACTIONS.ADD_BOOK_COPY_FAILED:
            return {
                ...state,
                keepEditCopy: true
            }


        default:
            return state
    }
}