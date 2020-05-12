import { ACTIONS } from '../actions/authorActions'

export default function authors(state = [], action) {
    const { type, payload } = action

    switch (type) {
        case ACTIONS.FETCH_AUTHOR_SUCCEEDED:
            return {
                authors: payload.data
            }
        default:
            return state
    }
}