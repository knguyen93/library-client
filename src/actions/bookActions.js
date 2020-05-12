import { CALL_API, HTTP_METHODS } from '../middleware/api'

export const ACTIONS = {
    FETCH_BOOKS: 'FETCH_BOOKS',
    FETCH_BOOKS_SUCCEEDED: 'FETCH_BOOKS_SUCCEEDED',
    FETCH_BOOKS_FAILED: 'FETCH_BOOKS_FAILED',
    ADD_BOOK_COPY: 'ADD_BOOK_COPY',
    ADD_NEW_BOOK: 'ADD_NEW_BOOK',
    ADD_NEW_BOOK_FAILED: 'ADD_NEW_BOOK_FAILED',
    ADD_NEW_BOOK_SUCCEEDED: 'ADD_NEW_BOOK_SUCCEEDED',

    FILTER_BOOK: 'FILTER_BOOK',
    FILTER_BOOK_SUCCEEDED: 'FILTER_BOOK_SUCCEEDED',
    FILTER_BOOK_FAILED: 'FILTER_BOOK_FAILED',
}

export function fetchBooks() {
    return {
        [CALL_API]: {
            types: [ACTIONS.FETCH_BOOKS, ACTIONS.FETCH_BOOKS_SUCCEEDED, ACTIONS.FETCH_BOOKS_FAILED, true],
            endpoint: '/book/list',
            method: HTTP_METHODS.GET,
        }
    }
}

export function addNewBook({ title, isbn, publisher, overdueFee }) {
    return {
        [CALL_API]: {
            types: [ACTIONS.ADD_NEW_BOOK, ACTIONS.ADD_NEW_BOOK_SUCCEEDED, ACTIONS.ADD_NEW_BOOK_FAILED, true],
            endpoint: '/books',
            method: HTTP_METHODS.POST,
            body: { title, isbn, publisher, overdueFee }
        }
    }
}

export function filterBook(searchString) {
    return {
        [CALL_API]: {
            types: [ACTIONS.FILTER_BOOK, ACTIONS.FILTER_BOOK_SUCCEEDED, ACTIONS.FILTER_BOOK_SUCCEEDED, true],
            endpoint: `/book/search?searchString=${searchString}`,
            method: HTTP_METHODS.GET,
        }
    }
}