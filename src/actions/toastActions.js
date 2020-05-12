export const ACTIONS = {
    ADD_TOAST: 'ADD_TOAST',
    REMOVE_TOAST: 'REMOVE_TOAST'
}

export const TOAST_TYPE = {
    ERROR: 'bg-danger',
    WARNING: 'bg-warning',
    INFO: 'bg-info',
    SUCCESS: 'bg-success',
}

let count = 0
function uniqueId() {
    return count++
}

export function addToast({title, message, toastType}) {
    return {
        type: ACTIONS.ADD_TOAST,
        payload: {
            item: {
                title,
                message,
                id: uniqueId(),
                tClass: toastType
            }
        }
    }
}

export function removeToast(id) {
    return {
        type: ACTIONS.REMOVE_TOAST,
        payload: {
            id
        }
    }
}