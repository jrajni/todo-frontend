import { FETCH_TASK, ADD_TASK, DELETE_TASK, UPDATE_TASK } from '../actions/type'
const initialState = {
    items: [],
    loading: false,
    addloading: false,
    deleteloading: false,
    updateloading: false,
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
                // loading: true,
                items: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                addloading: true,
                items: action.payload
            }
        case DELETE_TASK:
            return {
                ...state,
                deleteloading: true,
                items: action.payload
            }
        case UPDATE_TASK:
            return {
                ...state,
                updateloading: true,
                items: action.payload
            }
        default:
            return state
        // case FETCH_TASK
    }
}