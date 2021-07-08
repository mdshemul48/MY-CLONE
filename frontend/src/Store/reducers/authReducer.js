import { createSlice } from "@reduxjs/toolkit"
import jwtDecode from "jwt-decode"

const initialState = {
    user: "",
    token: "",
    loginErrors: [],
    loading: false

}

const decodeJWT = (token) => {
    const decoded = jwtDecode(token)
    const expiresIn = new Date(decoded.exp * 1000)

    if (expiresIn < new Date()) {
        localStorage.removeItem("userToken")
    } else {
        return decoded
    }
}


// this will read the token from local storage. decode and check if login expires or not.
//  if login expires it will remove token from local storage.
const userToken = localStorage.getItem('userToken')
if (userToken) {
    initialState.token = userToken
    initialState.user = decodeJWT(userToken)
}


const reducers = {
    login: (state, action) => {
        const { token } = action.payload
        state.user = decodeJWT(token)
        state.token = token
        state.loginErrors = []
        return state
    },
    logout: (state) => {
        state.user = ""
        state.token = ""
        return state
    },
    loginErrors: (state, action) => {
        const { error } = action.payload
        state.loginErrors = [error, ...state.loginErrors]
        return state
    },
    setLoading: (state) => {
        state.loading = true
        return state
    },
    closeLoading: (state) => {
        state.loading = false
        return state
    }
}


const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers
})


export const { login, logout, loginErrors } = authReducer.actions

export default authReducer.reducer