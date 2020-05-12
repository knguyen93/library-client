import {ACTIONS} from '../actions/toastActions'

const initData = {
    items: []
}

function toasts(state = initData, action) {
    const { type, payload } = action
    switch (type) {
        case ACTIONS.ADD_TOAST:
            return {
                items: state.items.concat(payload.item)
            }

        case ACTIONS.REMOVE_TOAST:
            return {
                items: state.items.filter(item => item.id !== payload.id)
            }
        default:
            return state
    }
}

export default toasts