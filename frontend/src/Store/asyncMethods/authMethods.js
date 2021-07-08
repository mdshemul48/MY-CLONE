import { login, logout, loginErrors } from "../reducers/authReducer"
import axios from "../../util/axiosConfig"

export const loginMethod = (loginInfo) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("/auth/login", loginInfo, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const token = response.data.token
            dispatch(login({ token }))
            localStorage.setItem("userToken", token)
        } catch (error) {
            dispatch(loginErrors({ error: error.response.data.message }))
        }
    }
}

export const logoutMethod = () => {
    return (dispatch) => {
        localStorage.removeItem("userToken")
        dispatch(logout())
    }
}