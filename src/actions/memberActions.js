import { CALL_API, HTTP_METHODS } from '../middleware/api'

export const ACTIONS = {
    FETCH_MEMBERS: 'FETCH_MEMBERS',
    FETCH_MEMBERS_SUCCEEDED: 'FETCH_MEMBERS_SUCCEEDED',
    FETCH_MEMBERS_FAILED: 'FETCH_MEMBERS_FAILED',

    FILTER_MEMBER: 'FILTER_MEMBER',
    FILTER_MEMBER_SUCCEEDED: 'FILTER_MEMBER_SUCCEEDED',
    FILTER_MEMBER_FAILED: 'FILTER_MEMBER_FAILED',

    ADD_MEMBER: 'ADD_MEMBER',
    ADD_MEMBER_SUCCEEDED: 'ADD_MEMBER_SUCCEEDED',
    ADD_MEMBER_FAILED: 'ADD_MEMBER_FAILED',

    CHECKOUT: 'CHECKOUT',
    CHECKOUT_SUCCEEDED: 'CHECKOUT_SUCCEEDED',
    CHECKOUT_FAILED: 'CHECKOUT_FAILED',

    RENT_BOOK: 'RENT_BOOK',
    RETURN_BOOK: 'RETURN_BOOK',

    SELECT_BOOK: 'SELECT_BOOK',
    SELECT_MEMBER: 'SELECT_MEMBER',

    FETCH_CHECKOUT_RECORDS: 'FETCH_CHECKOUT_RECORDS',
    FETCH_CHECKOUT_RECORDS_SUCCEEDED: 'FETCH_CHECKOUT_RECORDS_SUCCEEDED',
    FETCH_CHECKOUT_RECORDS_FAILED: 'FETCH_CHECKOUT_RECORDS_FAILED',

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

export function filterMember(searchString) {
    return {
        [CALL_API]: {
            types: [ACTIONS.FILTER_MEMBER, ACTIONS.FILTER_MEMBER_SUCCEEDED, ACTIONS.FILTER_MEMBER_FAILED],
            endpoint: `/member/search?searchString=${searchString}`,
            method: HTTP_METHODS.GET,
        }
    }
}

export function processCheckout({memberId, isbn}) {
    return {
        [CALL_API]: {
            types: [ACTIONS.CHECKOUT, ACTIONS.CHECKOUT_SUCCEEDED, ACTIONS.CHECKOUT_FAILED, true],
            endpoint: `/checkout/book/${isbn}/member/${memberId}`,
            method: HTTP_METHODS.POST,
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

export function login1({userName, password}) {
    return {
        [CALL_API]: {
            types: [ACTIONS.LOGIN, ACTIONS.LOGIN_SUCCEEDED, ACTIONS.LOGIN_FAILED, true],
            endpoint: `/oauth/token?grant_type=password&username=${userName}&password=${password}`,
            method: HTTP_METHODS.POST,
        }
    }
}

export function login(params) {
    return {
        [CALL_API]: {
            types: [ACTIONS.LOGIN, ACTIONS.LOGIN_SUCCEEDED, ACTIONS.LOGIN_FAILED, true],
            endpoint: '/auth/login',
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

export function selectMember(memberId) {
    return {
        type: ACTIONS.SELECT_MEMBER,
        payload: memberId
    }
}

export function selectBook(isbn) {
    return {
        type: ACTIONS.SELECT_BOOK,
        payload: isbn
    }
}

export function fetchCheckoutRecords(memberId) {
    return {
        [CALL_API]: {
            types: [ACTIONS.FETCH_CHECKOUT_RECORDS, ACTIONS.FETCH_CHECKOUT_RECORDS_SUCCEEDED, ACTIONS.FETCH_CHECKOUT_RECORDS_FAILED],
            endpoint: `/member?memberId=${memberId}`,
            method: HTTP_METHODS.GET,
        }
    }
}