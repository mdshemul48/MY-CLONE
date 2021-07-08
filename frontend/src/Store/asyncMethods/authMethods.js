import { login, logout, loginErrors } from "../reducers/authReducer"
import axios from "../../util/axiosConfig"

export const loginMethods = (loginInfo) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("/auth/login", loginInfo, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(response)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
}