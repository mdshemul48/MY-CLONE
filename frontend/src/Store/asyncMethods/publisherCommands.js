import { setCommands, setCommand, removeCommand, setErrors, setLoading, closeLoading } from "../reducers/publishCommands"

import axios from "../../util/axiosConfig"

// --------------------------
// this will fetch all the commands and store them in the state
// --------------------------
export const getAllCommands = () => {
    return async (dispatch) => {
        dispatch(setLoading())
        try {
            const { data } = await axios.get("/publisher")
            dispatch(setCommands(data.allEntry))
            dispatch(closeLoading())
        } catch (error) {
            dispatch(closeLoading())
            dispatch(setErrors("Could not load Publish data."))
        }
    }
}
// --------------------------
// this will add new command to the list of commands 
// --------------------------
export const addCommand = (command) => {
    return async (dispatch) => {
        dispatch(setLoading())
        try {
            const { data } = await axios.post("/publisher", command)
            dispatch(setCommand(data.createdPublisherEntry))
            dispatch(closeLoading())
        } catch (error) {
            dispatch(closeLoading())
            dispatch(setErrors("Could not add Publish data."))
        }
    }
}

// --------------------------
// this will delete the command
// --------------------------
export const commandRemover = (id) => {
    return async (dispatch) => {
        dispatch(setLoading())
        try {
            await axios.delete("/publisher/delete/" + id)
            dispatch(removeCommand({ id }))
            dispatch(closeLoading())
        } catch (error) {
            dispatch(closeLoading())
            dispatch(setErrors("Could not remove Publish data."))
        }
    }
}