import {combineReducers} from 'redux'
import bookReducer from './BooksReducer'
import memberReducer from './MemberReducer'
import authReducer from './AuthenticationReducer'

export default combineReducers({memberReducer, bookReducer, authReducer});
