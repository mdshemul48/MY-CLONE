import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: "",
    token: "",
    loginErrors: []

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
    }
}


const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers
})


export const { login, logout } = authReducer.actions

export default authReducer.reducer