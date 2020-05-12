import { addToast, TOAST_TYPE } from "../actions/toastActions"
import * as memberActions from '../actions/memberActions'
import * as bookActions from '../actions/bookActions'

export const toastMiddleware = store => next => action => {
    const { type } = action

    switch (type) {
        case memberActions.ACTIONS.FETCH_MEMBERS_FAILED:
            store.dispatch(addToast({ title: 'Error', message: 'Unable to fetch the Members', toastType: TOAST_TYPE.ERROR }))
            return next(action)

        case bookActions.ACTIONS.FETCH_BOOKS_FAILED:
            store.dispatch(addToast({ title: 'Error', message: 'Unable to fetch the Books', toastType: TOAST_TYPE.ERROR }))
            return next(action)

        default:
            return next(action)
    }
}