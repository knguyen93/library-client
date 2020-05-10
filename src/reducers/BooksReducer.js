import { ACTIONS} from '../actions/bookActions'

let count = 1;
function uniqueId() {
    return count++;
}

const initState = {
    records: []
}

export default function books(state = initState, action) {
    switch (action.type) {
        case ACTIONS.FETCH_BOOKS_SUCCEEDED:
            return {
                records: action.payload.books
            }
        default:
            return state
    }
}