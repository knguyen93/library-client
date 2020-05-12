import {combineReducers} from 'redux'
import bookReducer from './BooksReducer'
import memberReducer from './MemberReducer'
import authReducer from './AuthenticationReducer'
import toastReducer from './ToastReducer'

export default combineReducers({memberReducer, bookReducer, authReducer, toastReducer});
