import { setCommands, setCommand, setErrors, setLoading, closeLoading } from "../reducers/publishCommands"

import axios from "../../util/axiosConfig"

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