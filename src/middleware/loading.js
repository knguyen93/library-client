import $ from 'jquery'

const loadingMiddleware = store => next => action => {
    if (action && action.isLoading) {
        $('#loadingLayout').addClass('show')
    } else {
        $('#loadingLayout').removeClass('show')
    }
    return next(action)
}

export default loadingMiddleware