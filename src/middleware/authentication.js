import { ACTIONS } from '../actions/memberActions'

const TOKEN = {
    ID: 'TOKEN_ID',
    ROLE: 'USER_ROLE'
}

export const authenticationMiddlewear = store => next => action => {
    switch (action.type) {
        case ACTIONS.LOGIN_SUCCEEDED:
            localStorage.setItem(TOKEN.ID, 'Hello Khanh')
            localStorage.setItem(TOKEN.ROLE, 'MEMBER')
            return next(action)

        case ACTIONS.LOGOUT:
            localStorage.removeItem(TOKEN.ID)
            localStorage.removeItem(TOKEN.ROLE)
            return next(action)

        default:
            return next(action)
    }
}