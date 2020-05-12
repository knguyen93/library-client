import { ACTIONS } from '../actions/memberActions'

export const USER_INFO = {
    ID: 'USER_ID',
    PERMISSIONS: 'PERMISSIONS',
    NAME: 'USER_NAME'
}

export const authenticationMiddlewear = store => next => action => {
    switch (action.type) {
        case ACTIONS.LOGIN_SUCCEEDED:
            const userData = action.payload?.data?.systemUser
            localStorage.setItem(USER_INFO.ID, userData.userName)
            localStorage.setItem(USER_INFO.PERMISSIONS, JSON.stringify(userData.permissionsGranted))
            localStorage.setItem(USER_INFO.NAME, userData.fullName)

            return next(action)

        case ACTIONS.LOGOUT:
            localStorage.removeItem(USER_INFO.ID)
            localStorage.removeItem(USER_INFO.PERMISSIONS)
            localStorage.removeItem(USER_INFO.NAME)
            return next(action)

        default:
            return next(action)
    }
}