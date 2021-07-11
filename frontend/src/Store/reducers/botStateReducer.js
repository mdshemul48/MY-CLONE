import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    botStatus: undefined,
    errors: [],
}


const reducers = {
    showStatus: (state, action) => {
        state.botStatus = action.payload
        return state
    },
    setError: (state, action) => {
        state.errors.unshift(action.payload)
        return state
    }
}

const botStatusReducer = createSlice({
    name: "botStatus",
    initialState,
    reducers,
})

export const { showStatus, setError } = botStatusReducer.actions

export default reducers.reducer