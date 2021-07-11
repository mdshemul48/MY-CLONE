import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    botStatus: [{}, {}, {},],
    errors: [],
    loading: false
}


const reducers = {
    showStatus: (state, action) => {
        state.botStatus = action.payload
        return state
    },
    setError: (state, action) => {
        state.errors.unshift(action.payload)
        return state
    },
    setLoading: (state) => {
        state.loading = true;
        return state
    },
    closeLoading: (state) => {
        state.loading = false;
        return state
    }
}

const botStatusReducer = createSlice({
    name: "botStatus",
    initialState,
    reducers,
})

export const { showStatus, setError } = botStatusReducer.actions

export default botStatusReducer.reducer