import { FETCH_TASK, ADD_TASK, DELETE_TASK, UPDATE_TASK } from '../actions/type'
const initialState = {
    items: [],
    currentItem: {
        text: "",
        key: "",
        isActive: true
    }
}
export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TASK:
            return {
                ...state,
                items: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                items: action.payload
            }
        case DELETE_TASK:
            console.log("delete working")
            return {
                ...state,
                items: action.payload
            }
        case UPDATE_TASK:
            console.log("update working")
            return {
                ...state,
                items: action.payload
            }
        default:
            return state
        // case FETCH_TASK
    }
}