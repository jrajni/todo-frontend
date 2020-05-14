import {
    LOGIN_SUCCESS, LOGOUT_SUCCESS,
} from '../actions/type'

const initialState = {
    token: localStorage.getItem('authToken'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    userId: ""
}
export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log("login scuss", action.payload.user)
            localStorage.setItem("authToken", action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                token: action.payload.token,
                // userId: 'randomvalue'
                userId: action.payload.user
            };
        case LOGOUT_SUCCESS:
            localStorage.removeItem("authToken");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
            };
        default:
            return state;
    }
}