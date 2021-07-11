import { showDownloads, setError } from "../reducers/downloadingReducer"
import axios from "../../util/axiosConfig"
const downloading = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("/torrent")
            dispatch(showDownloads(response.data))
        } catch (error) {
            dispatch(setError("Could Not load the torrent data."))
        }
    }
}

export default downloading