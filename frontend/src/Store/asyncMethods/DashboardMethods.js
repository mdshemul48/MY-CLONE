import { storeData, setLoading, closeLoading, setError } from "../reducers/dashboardReducer"
import axios from "../../util/axiosConfig"
export const dashboardData = () => {
    return async (dispatch) => {
        dispatch(setLoading())
        try {
            const response = await axios.get("/front-page")
            dispatch(storeData(response.data))
        } catch (err) {
            dispatch(setError({ error: "Could not load the Data." }))
        }
        dispatch(closeLoading())
    }
}

