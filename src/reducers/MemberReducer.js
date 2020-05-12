import { ACTIONS } from '../actions/memberActions'

const initState = {
    records: [],
    checkout: {
        isbn: '',
        memberId: ''
    },
    checkoutRecord: ''
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
                checkout: {
                    isbn: '',
                    memberId: ''
                }
            }

        case ACTIONS.SELECT_BOOK:
            return {
                ...state,
                checkout: {
                    ...state.checkout,
                    isbn: payload
                }
            }

        case ACTIONS.SELECT_MEMBER:
            return {
                ...state,
                checkout: {
                    ...state.checkout,
                    memberId: payload
                }
            }

        case ACTIONS.FETCH_CHECKOUT_RECORDS_SUCCEEDED:
            return {
                ...state,
                checkoutRecord: payload?.data?.checkoutRecord
            }

        default:
            return state
    }
}