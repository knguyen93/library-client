import {combineReducers} from 'redux'
import bookReducer from './BooksReducer'
import memberReducer from './MemberReducer'

export default combineReducers({memberReducer, bookReducer});
