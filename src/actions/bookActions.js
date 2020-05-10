import * as api from '../api'

export const ACTIONS = {
    FETCH_BOOKS_SUCCEEDED: 'FETCH_BOOKS_SUCCEEDED',
    ADD_BOOK_COPY: 'ADD_BOOK_COPY',
    ADD_NEW_BOOK: 'ADD_NEW_BOOK'
}

export function fetchBooksSucceeded(books) {
    return {
        type: 'FETCH_BOOKS_SUCCEEDED',
        payload: {
            books
        }
    }
}

export function fetchBooks() {
    return dispatch => {
        api.fetchBooks()
            .then(res =>
                dispatch(fetchBooksSucceeded(res.data))
            )
    }
}