function authReducer(state = {isAuthenticated: false}, action) {
    return {
        ...state,
        ...initUserData()
    }
}

function initUserData() {
    return {
        isAuthenticated: localStorage.getItem('TOKEN_ID') !== undefined,
        role: localStorage.getItem('USER_ROLE') ? localStorage.getItem('USER_ROLE') : 'GUEST'
    }
}

export default authReducer;