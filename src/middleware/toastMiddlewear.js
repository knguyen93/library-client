import { addToast, TOAST_TYPE } from "../actions/toastActions"
import * as memberActions from '../actions/memberActions'
import * as bookActions from '../actions/bookActions'

export const toastMiddleware = store => next => action => {
    const { type } = action

    switch (type) {
        case memberActions.ACTIONS.FETCH_MEMBERS_FAILED:
            store.dispatch(
                addToast(
                    buildToastMessage('Error', 'Unable to fetch the Members', TOAST_TYPE.ERROR)
                )
            )
            return next(action)

        case bookActions.ACTIONS.FETCH_BOOKS_FAILED:
            store.dispatch(
                addToast(
                    buildToastMessage('Error', 'Unable to fetch the Books', TOAST_TYPE.ERROR)
                )
            )
            return next(action)

        case memberActions.ACTIONS.CHECKOUT_SUCCEEDED:
            store.dispatch(
                addToast(
                    buildToastMessage('Info', 'Checkout book successfully', TOAST_TYPE.SUCCESS)
                )
            )
            return next(action)

        case memberActions.ACTIONS.CHECKOUT_FAILED:
            const { response: { data: { errors } } } = action.payload
            store.dispatch(
                addToast(
                    buildToastMessage('Unable to Checkout the book', 'Info: ', TOAST_TYPE.WARNING, errors)
                )
            )
            return next(action)

        case memberActions.ACTIONS.LOGIN_FAILED:
            store.dispatch(
                addToast(
                    buildToastMessage('Login Fail', 'Details: ', TOAST_TYPE.WARNING, action.payload?.response?.data?.errors)
                )
            )
            return next(action)

        case bookActions.ACTIONS.ADD_BOOK_COPY_SUCCEEDED:
            store.dispatch(
                addToast(
                    buildToastMessage('Book Copy Added', 'Book Copy added successfully ', TOAST_TYPE.SUCCESS)
                )
            )
            store.dispatch(bookActions.fetchBooks())
            return next(action)

        case bookActions.ACTIONS.ADD_BOOK_COPY_FAILED:
            store.dispatch(
                addToast(
                    buildToastMessage('Error', 'Unable to add book copy', TOAST_TYPE.ERROR)
                )
            )
            return next(action)

        default:
            return next(action)
    }
}

function buildToastMessage(title, message, toastType, errors) {
    return { title, message, toastType, errors }
}