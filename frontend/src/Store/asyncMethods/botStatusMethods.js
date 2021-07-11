import { showStatus, setError } from "../reducers/botState";

import axios from "../../util/axiosConfig"


const fetchBotStatus = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("/bot-status")
            dispatch(showStatus(response.data.botData))
        } catch (err) {
            dispatch(setError("couldn't get bot status'"))
        }
    }
}

export default fetchBotStatus;