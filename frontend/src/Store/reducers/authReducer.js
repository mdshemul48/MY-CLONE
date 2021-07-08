import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: "",
    token: "",
    loginErrors: [],
    loading: false

}


const reducers = {
    login: (state, action) => {
        return state
    },
    logout: (state) => {
        return state
    },
    loginErrors: (state) => {
        return state
    },
    setLoading: (state) => {
        return state
    },
    closeLoading: (state) => {
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