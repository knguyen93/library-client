import { ACTIONS } from '../actions/memberActions'

const initState = {
    records: [],
    checkout: {
        isbn: '',
        memberId: ''
    },
    checkoutRecord: ''
}

export default function members(state = initState, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.FETCH_MEMBERS_SUCCEEDED:
            return {
                ...state,
                records: payload.data,
                pageNo: 1
            }

        case ACTIONS.FILTER_MEMBER_SUCCEEDED:
            return {
                ...state,
                records: payload.data,
                pageNo: 1
            }

        case ACTIONS.FETCH_MEMBERS_FAILED:
            return {
                ...state,
                error: payload
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

        case ACTIONS.UPDATE_PAGING:
            return {
                ...state,
                pageNo: payload
            }

        default:
            return state
    }
}