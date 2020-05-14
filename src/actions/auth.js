import axios from 'axios'
import {
    REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS,
    USER_LOADED, USER_LOADING, AUTH_ERROR
} from './type'
import { Redirect } from 'react-router'

import Config from "../config";


export const login = ({ email, password }) => async dispatch => {
    axios.post(Config.hostName + '/api/user/login', { email, password })
        .then((res) => {
            localStorage.setItem('authToken', res.data.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            // this.setState({ redirection: true })

        })
        .catch((err) => { console.log("api error", err) })
}

