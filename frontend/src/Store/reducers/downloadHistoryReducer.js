import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    downloadHistory: [],
    errors: [],
    loading: false
}

const reducers = {
    setDownloadDays: (state, action) => {
        state.downloadHistory = action.payload
        return state
    },
    setError: (state, action) => {
        state.errors.unshift(action.payload)
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

const DownloadHistoryReducer = createSlice({
    name: "DownloadHistoryReducer",
    initialState,
    reducers
})

export const { setDownloadDays, setError, setLoading, closeLoading } = DownloadHistoryReducer.actions

export default DownloadHistoryReducer.reducer