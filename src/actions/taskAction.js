import { FETCH_TASK, ADD_TASK, DELETE_TASK, UPDATE_TASK } from './type'
import axios from 'axios'

import Config from "../config";

export const fetchTask = (id) => async (dispatch) => {
    console.log("fetch", id)
    await axios.get(Config.hostName + `/api/task/${id}`)
        .then((res) => {
            dispatch({
                type: FETCH_TASK,
                payload: res.data.task
            })
        })
        .catch((err) => { console.log("axios error", err) })
}
export const addTask = (newItem, allitems, id) => async (dispatch) => {
    if (newItem.text !== "") {
        const items = [...allitems, newItem]
        await axios.post(Config.hostName + `/api/task/${id}`, { task: items })
            .then((res) => {
                dispatch({
                    type: ADD_TASK,
                    payload: res.data.task
                })
            })

            .catch((err) => { console.log("axios", err) })
        // this.setState({ items, currentItem: { text: '', key: '' } })

    }
}
export const deleteTask = (allitems, id) => async (dispatch) => {

    await axios.post(Config.hostName + `/api/task/${id}`, { task: allitems })
        .then((res) => {
            dispatch({
                type: DELETE_TASK,
                payload: res.data.task
            })
        })

        .catch((err) => { console.log("axios", err) })
}
export const updateTask = (allitems, id) => async (dispatch) => {

    await axios.post(Config.hostName + `/api/task/${id}`, { task: allitems })
        .then((res) => {
            dispatch({
                type: UPDATE_TASK,
                payload: res.data.task
            })
        })

        .catch((err) => { console.log("axios", err) })
}