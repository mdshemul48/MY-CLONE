import { setDownloadDays, setError, setLoading, closeLoading } from "../reducers/downloadHistoryReducer";
import axios from "../../util/axiosConfig"

const downloadHistoryReducer = () => {
    return async (dispatch) => {
        try {

            dispatch(setLoading())
            const response = await axios.get("/download-page")

            dispatch(setDownloadDays(response.data))
            dispatch(closeLoading())

        } catch (error) {
            dispatch(setError("could Not load the download history."))
            dispatch(closeLoading())
        }

    }
}

export default downloadHistoryReducer