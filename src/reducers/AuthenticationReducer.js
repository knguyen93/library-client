import {USER_INFO} from '../middleware/authentication'
import _ from 'lodash'

function authReducer(state = {isAuthenticated: false}, action) {
    return {
        ...state,
        ...initUserData()
    }
}

function initMockData() {
    return {
        isAuthenticated: true,
        permissions: ['ADD_BOOK', 'CHECKOUT_BOOK', 'ADD_MEMBER']
    }
}

function initUserData() {
    return {
        isAuthenticated: !_.isEmpty(localStorage.getItem(USER_INFO.ID)),
        permissions: localStorage.getItem(USER_INFO.PERMISSIONS) ? JSON.parse(localStorage.getItem(USER_INFO.PERMISSIONS)) : [],
        fullName: localStorage.getItem(USER_INFO.NAME)
    }
}

export default authReducer;