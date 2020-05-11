import { CALL_API, HTTP_METHODS } from '../middleware/api'

export const ACTIONS = {
    FETCH_MEMBERS: 'FETCH_MEMBERS',
    FETCH_MEMBERS_SUCCEEDED: 'FETCH_MEMBERS_SUCCEEDED',
    FETCH_MEMBERS_FAILED: 'FETCH_MEMBERS_FAILED',

    FILTER_MEMBER: 'FILTER_MEMBER',

    ADD_MEMBER: 'ADD_MEMBER',
    ADD_MEMBER_SUCCEEDED: 'ADD_MEMBER_SUCCEEDED',
    ADD_MEMBER_FAILED: 'ADD_MEMBER_FAILED',

    RENT_BOOK: 'RENT_BOOK',
    RETURN_BOOK: 'RETURN_BOOK',

    LOGIN: 'LOGIN',
    LOGIN_SUCCEEDED: 'LOGIN_SUCCEEDED',
    LOGIN_FAILED: 'LOGIN_FAILED',
    LOGOUT: 'LOGOUT'
}

export function addNewMember({firstName, lastName, dob, phone}) {
    return {
        [CALL_API]: {
            types: [ACTIONS.ADD_MEMBER, ACTIONS.ADD_MEMBER_SUCCEEDED, ACTIONS.ADD_MEMBER_FAILED, true],
            endpoint: '/members',
            method: HTTP_METHODS.POST,
            body: { firstName, lastName, dob, phone }
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
    return {
        [CALL_API]: {
            types: [ACTIONS.FETCH_MEMBERS, ACTIONS.FETCH_MEMBERS_SUCCEEDED, ACTIONS.FETCH_MEMBERS_FAILED, true],
            endpoint: '/member/list',
            method: HTTP_METHODS.GET,
        }
    }
}

export function login(params) {
    return {
        [CALL_API]: {
            types: [ACTIONS.LOGIN, ACTIONS.LOGIN_SUCCEEDED, ACTIONS.LOGIN_FAILED, true],
            endpoint: '/login',
            method: HTTP_METHODS.POST,
            body: params
        }
    }
}

export function logout() {
    return {
        type: ACTIONS.LOGOUT
    }
}