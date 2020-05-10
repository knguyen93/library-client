import * as api from '../api'

export const ACTIONS = {
    FETCH_MEMBERS_SUCCEEDED: 'FETCH_MEMBERS_SUCCEEDED',
    FILTER_MEMBER: 'FILTER_MEMBER',
    ADD_MEMBER: 'ADD_MEMBER',
    RENT_BOOK: 'RENT_BOOK',
    RETURN_BOOK: 'RETURN_BOOK'
}

export function fetchMembersSucceeded(members) {
    return {
        type: ACTIONS.FETCH_MEMBERS_SUCCEEDED,
        payload: {
            members
        }
    }
}

export function filterMember(filterString) {
    return {
        type: ACTIONS.FILTER_MEMBER,
        payload: {
            filter: filterString
        }
    }
}

export function fetchMembers() {
    return dispatch => {
        api.fetchMembers()
            .then(res =>
                dispatch(fetchMembersSucceeded(res.data))
            )
    }
}