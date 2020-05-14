import { createStore, combineReducers } from 'redux'
import taskReducer from './taskReducer'
import authReducer from './auth'
export default combineReducers({
    tasks: taskReducer,
    auth: authReducer
})