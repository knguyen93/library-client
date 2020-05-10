import { ACTIONS} from '../actions/memberActions'

let count = 1;
function uniqueId() {
    return count++;
}

const initState = {
    records: []
}

export default function membbers(state = initState, action) {
    switch (action.type) {
        case ACTIONS.FETCH_MEMBERS_SUCCEEDED:
            return {
                records: action.payload.members
            }
        default:
            return state
    }
}